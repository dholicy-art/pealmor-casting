import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, ShieldCheck, FileCheck, AlertTriangle, ScrollText, Settings, Menu, X } from "lucide-react";
import HelpGuide from "@/components/HelpGuide";
import { useI18n } from "@/i18n/I18nContext";
import { useAuth } from "@/hooks/useAuth";
import ViewModeToggle from "@/components/ViewModeToggle";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  const navItems = [
    { icon: LayoutDashboard, label: t.admin.overview, path: "/admin" },
    { icon: Users, label: t.admin.users, path: "/admin/users" },
    { icon: ShieldCheck, label: t.admin.verification, path: "/admin/verification" },
    { icon: FileCheck, label: t.admin.requestReview, path: "/admin/requests" },
    { icon: AlertTriangle, label: t.admin.disputes, path: "/admin/disputes" },
    { icon: ScrollText, label: t.admin.auditLogs, path: "/admin/audit" },
    { icon: Settings, label: t.common.settings, path: "/admin/settings" },
  ];

  const nav = (
    <>
      <Link to="/" className="flex items-center gap-2 px-3 py-4 mb-6" onClick={() => setMobileOpen(false)}>
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-display font-bold text-sm">P</span>
        </div>
        <span className="font-display font-bold text-lg text-foreground">Admin</span>
      </Link>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border pt-3 mt-3 px-3">
        <ViewModeToggle variant="admin" />
      </div>
      <div className="border-t border-border pt-4 mt-1">
        <div className="flex items-center gap-3 px-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">AK</div>
          <div>
            <p className="text-sm font-medium text-foreground">Admin Kim</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex w-60 flex-col border-r border-border bg-card p-4 shrink-0">{nav}</aside>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 border-b border-border bg-card">
        <button onClick={() => setMobileOpen(true)}><Menu className="w-5 h-5 text-foreground" /></button>
        <span className="font-display font-bold text-sm text-foreground">{t.landing.adminPortal}</span>
        <HelpGuide />
      </div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 p-4 border-r border-border bg-card flex flex-col">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-muted-foreground"><X className="w-5 h-5" /></button>
            {nav}
          </aside>
        </div>
      )}
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">{children}</main>
    </div>
  );
}
