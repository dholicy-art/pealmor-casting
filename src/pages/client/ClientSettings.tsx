import ClientLayout from "@/components/layouts/ClientLayout";
import LanguageSelector from "@/components/LanguageSelector";
import { useI18n } from "@/i18n/I18nContext";

export default function ClientSettings() {
  const { t } = useI18n();

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 max-w-2xl space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t.common.settings}</h1>
          <p className="text-muted-foreground text-sm mt-1">Client Portal</p>
        </div>
        <LanguageSelector />
      </div>
    </ClientLayout>
  );
}
