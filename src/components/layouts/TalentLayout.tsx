import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, ShieldCheck, DollarSign, Bell, Settings } from "lucide-react";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/talent" },
  { icon: User, label: "Profile", path: "/talent/profile" },
  { icon: ShieldCheck, label: "Approvals", path: "/talent/approvals" },
  { icon: DollarSign, label: "Earnings", path: "/talent" },
  { icon: Bell, label: "Notifications", path: "/talent" },
  { icon: Settings, label: "Settings", path: "/talent" },
];

export default function TalentLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card p-4">
        <Link to="/" className="flex items-center gap-2 px-3 py-4 mb-6">
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
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
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
