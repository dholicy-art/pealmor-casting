import { Eye, EyeOff } from "lucide-react";
import { useViewModeStore } from "@/store/viewModeStore";
import { useAuth } from "@/hooks/useAuth";

export default function ViewModeToggle({ variant = "default" }: { variant?: "default" | "admin" }) {
  const { isActualAdmin } = useAuth();
  const { viewAsNormalUser, toggleViewMode } = useViewModeStore();

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
          <span>일반 사용자로 보는 중</span>
          <span className="ml-auto text-[10px] underline">어드민으로 복구</span>
        </>
      ) : (
        <>
          <Eye className="w-3.5 h-3.5" />
          <span>일반 사용자로 보기</span>
        </>
      )}
    </button>
  );
}
