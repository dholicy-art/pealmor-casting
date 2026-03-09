import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import type { Language, Translations } from './types';
import { LANGUAGES } from './types';
import { en } from './en';
import { ko } from './ko';
import { withDefaults } from './i18n-defaults';
import { supabase } from '@/integrations/supabase/client';

// Lazy load other languages with defaults applied
import { ja as jaRaw } from './ja';
import { zh as zhRaw } from './zh';
import { fr as frRaw } from './fr';
import { es as esRaw, de as deRaw, pt as ptRaw, ar as arRaw, vi as viRaw } from './other-langs';

const ja = withDefaults(jaRaw);
const zh = withDefaults(zhRaw);
const fr = withDefaults(frRaw);
const es = withDefaults(esRaw);
const de = withDefaults(deRaw);
const pt = withDefaults(ptRaw);
const ar = withDefaults(arRaw);
const vi = withDefaults(viRaw);

const translationMap: Record<Language, Translations> = { en, ko, ja, zh, fr, es, de, pt, ar, vi };

function detectLanguage(): Language {
  const saved = localStorage.getItem('pealmor-language') as Language | null;
  if (saved && translationMap[saved]) return saved;
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

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('pealmor-language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, []);

  const value = useMemo(() => ({ language, setLanguage, t: translationMap[language] }), [language, setLanguage]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export { LANGUAGES } from './types';
export type { Language } from './types';
