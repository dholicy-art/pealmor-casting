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
        <span className="font-display font-bold text-lg text-foreground"em) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-primary/10 text-primary" : "hover:bg-gray-100"
              }`}
              style={!active ? { color: "hsl(var(--admin-muted-fg))" } : undefined}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t pt-3 mt-3 px-3" style={{ bborder-border pt-3 mt-3 pxborder-border pt-3 mt-3 pxborder-border pt-3 mt-3 px-3"order-border pt-4 mt-1"   <div className="w-8 h-8 rounded-full border-border pt-4 mt-1"mibold text-primary">AK</div>
          <div>
            <p className="text-sm font-medium" style={{ color: "hsl(var(--admin-fg))" }}>Admin Kim</p>
            <p className="text-xs" style={{ color: "hsl(var(--admin-muted-fg))" }}>Super Admin</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen" style={{ background: "hsl(var(--admin-bg))" }}>
      <aside className="hidden lg:flex w-60 flex-col border-r p-4 shrink-0" style={{ borderColor: "hsl(var(--admin-border))", background: "hsl(var(--admin-card))" }}>{nav}</aside>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 border-b" style={{ background: "hsl(var(--admin-card))", borderColor: "hsl(var(--admin-border))" }}>
        <button onClick={() => setMobileOpen(true)}><Menu className="w-5 h-5" style={{ color: "hsl(var(--admin-fg))" }} /></button>
        <span className="font-display font-bold text-sm" style={{ color: "hsl(var(--admin-fg))" }}>{t.landing.adminPortal}</span>
        <HelpGuide />
      </div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 p-4 border-r flex flex-col" style={{ background: "hsl(var(--admin-card))", borderColor: "hsl(var(--admin-border))" }}>
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4" style={{ color: "hsl(var(--admin-muted-fg))" }}><X className="w-5 h-5" /></button>
            {nav}
          </aside>
        </div>
      )}
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">{children}</main>
    </div>
  );
}
