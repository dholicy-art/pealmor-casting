import TalentLayout from "@/components/layouts/TalentLayout";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeSelector from "@/components/ThemeSelector";
import { useI18n } from "@/i18n/I18nContext";

export default function TalentSettings() {
  const { t } = useI18n();

  return (
    <TalentLayout>
      <div className="p-6 lg:p-8 max-w-2xl space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t.common.settings}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t.landing.talentPortal}</p>
        </div>
        <ThemeSelector />
        <LanguageSelector />
      </div>
    </TalentLayout>
  );
}
