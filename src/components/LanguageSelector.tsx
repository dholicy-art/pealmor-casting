import { useI18n } from '@/i18n/I18nContext';
import { LANGUAGES } from '@/i18n/types';
import type { Language } from '@/i18n/types';
import { Globe, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Globe className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-foreground text-sm sm:text-base">{t.common.languageSettings}</h3>
          <p className="text-xs text-muted-foreground truncate">{t.common.languageDescription}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {LANGUAGES.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                if (lang.code === language) return;
                setLanguage(lang.code);
                setTimeout(() => {
                  toast.success('✓');
                }, 50);
              }}
              className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-left transition-all active:scale-[0.98] ${
                isSelected
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                  : 'border-border bg-card hover:border-primary/30'
              }`}
            >
              <span className="text-lg sm:text-xl shrink-0">{lang.flag}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-foreground truncate">{lang.nativeLabel}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{lang.label}</p>
              </div>
              {isSelected && (
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
