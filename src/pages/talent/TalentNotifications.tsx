import TalentLayout from "@/components/layouts/TalentLayout";
import { usePlatformStore } from "@/store/platformStore";
import { Bell, CheckCircle, AlertTriangle, DollarSign, FileCheck, Info } from "lucide-react";
import { Link } from "react-router-dom";

const iconMap: Record<string, typeof Bell> = {
  request: FileCheck,
  approval: CheckCircle,
  rejection: AlertTriangle,
  warning: AlertTriangle,
  settlement: DollarSign,
  system: Info,
};

const colorMap: Record<string, string> = {
  request: "text-primary",
  approval: "text-success",
  rejection: "text-destructive",
  warning: "text-warning",
  settlement: "text-success",
  system: "text-info",
};

export default function TalentNotifications() {
  const { notifications, markNotificationRead } = usePlatformStore();

  return (
    <TalentLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground text-sm mt-1">{notifications.filter((n) => !n.read).length} unread</p>
        </div>

        <div className="space-y-2">
          {notifications.map((n) => {
            const Icon = iconMap[n.type] || Bell;
            const color = colorMap[n.type] || "text-muted-foreground";
            return (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`bg-card rounded-xl border p-4 flex items-start gap-3 cursor-pointer transition-colors hover:border-primary/30 ${
                  n.read ? "border-border opacity-60" : "border-accent/30"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full gradient-accent shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{n.createdAt}</p>
                </div>
                {n.link && (
                  <Link to={n.link} className="text-xs text-primary hover:underline shrink-0">View</Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </TalentLayout>
  );
}
