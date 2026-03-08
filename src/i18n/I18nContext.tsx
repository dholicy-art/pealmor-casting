import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language, Translations } from './types';
import { LANGUAGES } from './types';
import { en } from './en';
import { ko } from './ko';
import { ja } from './ja';
import { zh } from './zh';
import { fr } from './fr';
import { es, de, pt, ar, vi } from './other-langs';

const translationMap: Record<Language, Translations> = { en, ko, ja, zh, fr, es, de, pt, ar, vi };

function detectLanguage(): Language {
  // Check localStorage first
  const saved = localStorage.getItem('pealmor-language') as Language | null;
  if (saved && translationMap[saved]) return saved;

  // Detect from browser/device
  const browserLangs = navigator.languages || [navigator.language];
  for (const lang of browserLangs) {
    const code = lang.split('-')[0].toLowerCase() as Language;
    if (translationMap[code]) return code;
  }

  return 'en';
}

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {},
  t: en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('pealmor-language', lang);
    // Set HTML dir for RTL languages
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, []);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: translationMap[language] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export { LANGUAGES } from './types';
export type { Language } from './types';
