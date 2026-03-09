import ClientLayout from "@/components/layouts/ClientLayout";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeSelector from "@/components/ThemeSelector";
import { useI18n } from "@/i18n/I18nContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClientSettings() {
  const { t } = useI18n();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 max-w-2xl space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t.common.settings}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t.landing.clientPortal}</p>
        </div>
        <ThemeSelector />
        <LanguageSelector />
        <div className="pt-4 border-t border-border">
          <Button variant="destructive" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            로그아웃
          </Button>
        </div>
      </div>
    </ClientLayout>
  );
}
