import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, FolderOpen, BarChart3, Bookmark, Settings } from "lucide-react";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/client" },
  { icon: Search, label: "Search", path: "/client/search" },
  { icon: FolderOpen, label: "Projects", path: "/client/projects" },
  { icon: Bookmark, label: "Compare", path: "/client/compare" },
  { icon: BarChart3, label: "Analytics", path: "/client" },
  { icon: Settings, label: "Settings", path: "/client" },
];

export default function ClientLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card p-4">
        <Link to="/" className="flex items-center gap-2 px-3 py-4 mb-6">
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
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex items-center gap-3 px-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-secondary-foreground">
              JK
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Jun Kim</p>
              <p className="text-xs text-muted-foreground">Client</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
