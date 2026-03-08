import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, ShieldCheck, FileCheck, AlertTriangle, ScrollText, Settings } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin" },
  { icon: ShieldCheck, label: "Verification", path: "/admin" },
  { icon: FileCheck, label: "Requests", path: "/admin" },
  { icon: AlertTriangle, label: "Disputes", path: "/admin" },
  { icon: ScrollText, label: "Audit Logs", path: "/admin" },
  { icon: Settings, label: "Settings", path: "/admin" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen" style={{ background: "hsl(var(--admin-bg))" }}>
      <aside className="hidden lg:flex w-60 flex-col border-r p-4" style={{ borderColor: "hsl(var(--admin-border))", background: "hsl(var(--admin-card))" }}>
        <Link to="/" className="flex items-center gap-2 px-3 py-4 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">P</span>
          </div>
          <span className="font-display font-bold text-lg" style={{ color: "hsl(var(--admin-fg))" }}>Admin</span>
        </Link>
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-gray-100"
                }`}
                style={!active ? { color: "hsl(var(--admin-muted-fg))" } : undefined}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
