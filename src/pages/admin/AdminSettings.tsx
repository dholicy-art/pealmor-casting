import AdminLayout from "@/components/layouts/AdminLayout";
import LanguageSelector from "@/components/LanguageSelector";
import { useI18n } from "@/i18n/I18nContext";

export default function AdminSettings() {
  const { t } = useI18n();

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-2xl space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: "hsl(var(--admin-fg))" }}>{t.common.settings}</h1>
          <p className="text-sm mt-1" style={{ color: "hsl(var(--admin-muted-fg))" }}>Admin Portal</p>
        </div>
        <LanguageSelector />
      </div>
    </AdminLayout>
  );
}
