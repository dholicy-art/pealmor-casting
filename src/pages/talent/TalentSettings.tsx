import TalentLayout from "@/components/layouts/TalentLayout";
import LanguageSelector from "@/components/LanguageSelector";
import { useI18n } from "@/i18n/I18nContext";

export default function TalentSettings() {
  const { t } = useI18n();

  return (
    <TalentLayout>
      <div className="p-6 lg:p-8 max-w-2xl space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t.common.settings}</h1>
          <p className="text-muted-foreground text-sm mt-1">Talent Portal</p>
        </div>
        <LanguageSelector />
      </div>
    </TalentLayout>
  );
}
