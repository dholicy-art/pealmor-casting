import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, FolderOpen, BarChart3, Bookmark, Settings, Menu, X, Bell, Sparkles } from "lucide-react";
import { usePlatformStore } from "@/store/platformStore";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nContext";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unreadCount = usePlatformStore((s) => s.notifications.filter((n) => !n.read).length);
  const { t } = useI18n();

  const navItems = [
    { icon: Home, label: t.client.dashboard, path: "/client" },
    { icon: Search, label: t.client.searchActors, path: "/client/search" },
    { icon: Sparkles, label: "AI Audition", path: "/client/audition" },
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
      </nav>
      <div className="border-t border-border pt-3 mt-3">
        <p className="text-[10px] text-muted-foreground px-3 mb-2 font-mono">PEALMOR Connected</p>
      </div>
      <div className="border-t border-border pt-4 mt-1">
        <div className="flex items-center gap-3 px-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-secondary-foreground">JK</div>
          <div>
            <p className="text-sm font-medium text-foreground">Jun Kim</p>
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
        <div className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full gradient-accent text-[10px] flex items-center justify-center text-accent-foreground font-bold">{unreadCount}</span>
          )}
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
