import { useTheme, Theme } from '@/theme/ThemeContext';
import { useI18n } from '@/i18n/I18nContext';
import { Sun, Moon } from 'lucide-react';

const themes: { value: Theme; icon: typeof Sun; labelKey: 'dark' | 'light' }[] = [
  { value: 'dark', icon: Moon, labelKey: 'dark' },
  { value: 'light', icon: Sun, labelKey: 'light' },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Sun className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">{t.common.appearance}</h3>
          <p className="text-xs text-muted-foreground">{t.common.themeDescription}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {themes.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
              theme === opt.value
                ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                : 'border-border bg-card hover:border-primary/30'
            }`}
          >
            <opt.icon className="w-5 h-5 text-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground capitalize">{opt.labelKey === 'dark' ? t.common.darkMode : t.common.lightMode}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
