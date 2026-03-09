import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, ShieldCheck, DollarSign, Bell, Settings, FileText, Menu, X, ShieldAlert } from "lucide-react";
import HelpGuide from "@/components/HelpGuide";
import { usePlatformStore } from "@/store/platformStore";
import { useI18n } from "@/i18n/I18nContext";
import { useAuth } from "@/hooks/useAuth";
import ViewModeToggle from "@/components/ViewModeToggle";
import { useAuth } from "@/hooks/useAuth";

export default function TalentLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pendingCount = usePlatformStore((s) => s.requests.filter((r) => r.talentId === "t1" && r.status === "pending").length);
  const { t } = useI18n();
  const { user, isAdmin } = useAuth();

  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  const navItems = [
    { icon: Home, label: t.talent.dashboard, path: "/talent" },
    { icon: User, label: t.talent.profile, path: "/talent/profile" },
    { icon: ShieldCheck, label: t.talent.approvals, path: "/talent/approvals" },
    { icon: DollarSign, label: t.talent.earnings, path: "/talent/earnings" },
    { icon: FileText, label: t.client.licenses, path: "/talent/licenses" },
    { icon: Bell, label: t.common.notifications, path: "/talent/notifications" },
    { icon: Settings, label: t.common.settings, path: "/talent/settings" },
  ];

  const nav = (
    <>
      <Link to="/" className="flex items-center gap-2 px-3 py-4 mb-6" onClick={() => setMobileOpen(false)}>
        <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
          <span className="text-accent-foreground font-display font-bold text-sm">P</span>
        </div>
        <span className="font-display font-bold text-lg text-foreground">PEALMOR</span>
        <span className="text-xs text-muted-foreground ml-1">Talent</span>
      </Link>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}>
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.path === "/talent/approvals" && pendingCount > 0 && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full gradient-accent text-accent-foreground font-bold">{pendingCount}</span>
              )}
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mt-2 border border-destructive/20 ${
              location.pathname.startsWith("/admin") ? "bg-destructive/10 text-destructive" : "text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            {t.landing.adminPortal}
          </Link>
        )}
      </nav>
      <div className="border-t border-border pt-3 mt-3 px-3">
        <ViewModeToggle />
      </div>
      <div className="border-t border-border pt-4 mt-1">
        <div className="flex items-center gap-3 px-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-secondary-foreground">{initials}</div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-foreground">{displayName}</p>
              {isAdmin && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-destructive/10 text-destructive font-bold">Admin</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{t.landing.talentPortal}</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card p-4 shrink-0">{nav}</aside>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass h-14 flex items-center justify-between px-4">
        <button onClick={() => setMobileOpen(true)} className="text-foreground"><Menu className="w-5 h-5" /></button>
        <span className="font-display font-bold text-sm text-foreground">{t.landing.talentPortal}</span>
        <HelpGuide />
      </div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-card p-4 border-r border-border flex flex-col">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-muted-foreground"><X className="w-5 h-5" /></button>
            {nav}
          </aside>
        </div>
      )}
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">{children}</main>
    </div>
  );
}
