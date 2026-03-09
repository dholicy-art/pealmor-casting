import AdminLayout from "@/components/layouts/AdminLayout";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeSelector from "@/components/ThemeSelector";
import { useI18n } from "@/i18n/I18nContext";
import { usePlatformSettings } from "@/hooks/usePlatformSettings";
import { useTheme, Theme } from "@/theme/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function AdminSettings() {
  const { t, language } = useI18n();
  const { theme } = useTheme();
  const { settings, updateSetting } = usePlatformSettings();
  const { toast } = useToast();

  const saveDefaults = async () => {
    const err1 = await updateSetting("default_theme", theme);
    const err2 = await updateSetting("default_language", language);
    if (!err1 && !err2) {
      toast({ title: t.toast.settingsSaved || "Settings saved" });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{t.common.settings}</h1>
            <p className="text-sm mt-1 text-muted-foreground">{t.landing.adminPortal}</p>
          </div>
          <Button onClick={saveDefaults} size="sm" className="gap-1.5">
            <Save className="w-4 h-4" />
            {t.common.save || "Save as Default"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground border border-border rounded-lg p-3 bg-muted/30">
          {t.admin?.settingsGlobalNote || "Changes saved here will apply as defaults for all new and existing users."}
        </p>
        <ThemeSelector />
        <LanguageSelector />
      </div>
    </AdminLayout>
  );
}
