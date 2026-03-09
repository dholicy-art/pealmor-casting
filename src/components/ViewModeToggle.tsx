import { Eye, EyeOff } from "lucide-react";
import { useViewModeStore } from "@/store/viewModeStore";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/i18n/I18nContext";

export default function ViewModeToggle({ variant = "default" }: { variant?: "default" | "admin" }) {
  const { isActualAdmin } = useAuth();
  const { viewAsNormalUser, toggleViewMode } = useViewModeStore();
  const { t } = useI18n();

  if (!isActualAdmin) return null;

  const isAdmin = variant === "admin";

  return (
    <button
      onClick={toggleViewMode}
      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
        viewAsNormalUser
          ? "bg-amber-500/10 text-amber-600 border border-amber-500/30"
          : isAdmin
            ? "bg-primary/10 text-primary border border-primary/20"
            : "bg-muted text-muted-foreground border border-border"
      }`}
    >
      {viewAsNormalUser ? (
        <>
          <EyeOff className="w-3.5 h-3.5" />
          <span>{t.viewMode.viewingAsUser}</span>
          <span className="ml-auto text-[10px] underline">{t.viewMode.restoreAdmin}</span>
        </>
      ) : (
        <>
          <Eye className="w-3.5 h-3.5" />
          <span>{t.viewMode.viewAsUser}</span>
        </>
      )}
    </button>
  );
}
