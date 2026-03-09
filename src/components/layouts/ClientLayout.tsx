import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, FolderOpen, BarChart3, Bookmark, Settings, Menu, X, Bell, Sparkles, Network, Users, Globe, Wand2, ShieldAlert } from "lucide-react";
import HelpGuide from "@/components/HelpGuide";
import { usePlatformStore } from "@/store/platformStore";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nContext";
import { useAuth } from "@/hooks/useAuth";
import ViewModeToggle from "@/components/ViewModeToggle";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unreadCount = usePlatformStore((s) => s.notifications.filter((n) => !n.read).length);
  const { t } = useI18n();
  const { user, isAdmin } = useAuth();

  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  const navItems = [
    { icon: Home, label: t.client.dashboard, path: "/client" },
    { icon: Search, label: t.client.searchActors, path: "/client/search" },
    { icon: Network, label: t.client.actorNetwork, path: "/client/network" },
    { icon: Users, label: t.client.teams, path: "/client/teams" },
    { icon: Globe, label: t.client.universes, path: "/client/universes" },
    { icon: Sparkles, label: t.client.aiAudition, path: "/client/audition" },
    { icon: Wand2, label: t.client.autoCast, path: "/client/autocast" },
    { icon: FolderOpen, label: t.client.projects, path: "/client/projects" },
    { icon: Bookmark, label: t.client.compare, path: "/client/compare" },
    { icon: BarChart3, label: t.client.licenses, path: "/client/licenses" },
    { icon: Settings, label: t.common.settings, path: "/client/settings" },
  ];

  const nav = (
    <>
      <Link to="/" className="flex items-center gap-2 px-3 py-4 mb-6" onClick={() => setMobileOpen(false)}>
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
          <span className="text-primary-foreground font-display font-bold text-sm">P</span>
        </div>
        <span className="font-display font-bold text-lg text-foreground">PEALMOR</span>
      </Link>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.path === "/client/compare" && <CompareBadge />}
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
      <div className="border-t border-border pt-3 mt-3 space-y-2 px-3">
        <ViewModeToggle />
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-muted-foreground font-mono">PEALMOR Connected</p>
          <HelpGuide />
        </div>
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
            <p className="text-xs text-muted-foreground">{t.landing.clientPortal}</p>
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
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-[10px]">P</span>
          </div>
          <span className="font-display font-bold text-sm text-foreground">PEALMOR</span>
        </Link>
        <div className="flex items-center gap-2">
          <HelpGuide />
          <div className="relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full gradient-accent text-[10px] flex items-center justify-center text-accent-foreground font-bold">{unreadCount}</span>
            )}
          </div>
        </div>
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

function CompareBadge() {
  const count = usePlatformStore((s) => s.compareTalents.length);
  if (count === 0) return null;
  return (
    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full gradient-primary text-primary-foreground font-bold">{count}</span>
  );
}
