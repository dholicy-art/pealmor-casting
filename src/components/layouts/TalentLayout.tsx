import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, ShieldCheck, DollarSign, Bell, Settings, FileText, Menu, X } from "lucide-react";
import { usePlatformStore } from "@/store/platformStore";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/talent" },
  { icon: User, label: "Profile", path: "/talent/profile" },
  { icon: ShieldCheck, label: "Approvals", path: "/talent/approvals" },
  { icon: DollarSign, label: "Earnings", path: "/talent/earnings" },
  { icon: FileText, label: "Licenses", path: "/talent/licenses" },
  { icon: Bell, label: "Notifications", path: "/talent/notifications" },
  { icon: Settings, label: "Settings", path: "/talent/settings" },
];

export default function TalentLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pendingCount = usePlatformStore((s) => s.requests.filter((r) => r.talentId === "t1" && r.status === "pending").length);

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
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.label === "Approvals" && pendingCount > 0 && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full gradient-accent text-accent-foreground font-bold">
                  {pendingCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border pt-4 mt-4">
        <div className="flex items-center gap-3 px-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-secondary-foreground">YP</div>
          <div>
            <p className="text-sm font-medium text-foreground">Yuna Park</p>
            <p className="text-xs text-muted-foreground">Talent Portal</p>
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
        <span className="font-display font-bold text-sm text-foreground">Talent Portal</span>
        <div className="w-5" />
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
