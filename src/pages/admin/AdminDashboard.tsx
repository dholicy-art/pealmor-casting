import AdminLayout from "@/components/layouts/AdminLayout";
import { Users, ShieldCheck, AlertTriangle, FileCheck, ScrollText, DollarSign, Activity } from "lucide-react";

const recentLogs = [
  { time: "10:32 AM", user: "LuxeBeauty", action: "Casting request submitted", target: "Yuna Park" },
  { time: "10:15 AM", user: "Yuna Park", action: "Approved casting request", target: "NovaSkin — Brand Video" },
  { time: "09:48 AM", user: "System", action: "Policy conflict detected", target: "TechFlow request #r2" },
  { time: "09:30 AM", user: "Admin", action: "Verified talent identity", target: "Hana Ito" },
  { time: "09:12 AM", user: "System", action: "License expired", target: "Project #p4 — Holiday Series" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: "hsl(var(--admin-fg))" }}>Admin Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: "hsl(var(--admin-muted-fg))" }}>Platform overview and moderation</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Pending Verifications", value: "7", color: "#7c5cfc" },
            { icon: AlertTriangle, label: "High-Risk Requests", value: "3", color: "#e5484d" },
            { icon: FileCheck, label: "Licenses Today", value: "12", color: "#30a46c" },
            { icon: DollarSign, label: "Pending Settlements", value: "$24.5K", color: "#f5a623" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-5 border" style={{ background: "hsl(var(--admin-card))", borderColor: "hsl(var(--admin-border))" }}>
              <div className="flex items-center gap-3 mb-2">
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
                <span className="text-xs" style={{ color: "hsl(var(--admin-muted-fg))" }}>{s.label}</span>
              </div>
              <p className="font-display text-2xl font-bold" style={{ color: "hsl(var(--admin-fg))" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, title: "User Verification", desc: "7 pending identity verifications", action: "Review" },
            { icon: AlertTriangle, title: "Risk Monitoring", desc: "3 flagged requests need review", action: "View Flags" },
            { icon: ScrollText, title: "Dispute Center", desc: "1 open dispute case", action: "Handle" },
          ].map((card) => (
            <div key={card.title} className="rounded-xl p-5 border" style={{ background: "hsl(var(--admin-card))", borderColor: "hsl(var(--admin-border))" }}>
              <card.icon className="w-5 h-5 mb-3" style={{ color: "#7c5cfc" }} />
              <h3 className="font-display font-semibold mb-1" style={{ color: "hsl(var(--admin-fg))" }}>{card.title}</h3>
              <p className="text-xs mb-3" style={{ color: "hsl(var(--admin-muted-fg))" }}>{card.desc}</p>
              <button className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: "#7c5cfc10", color: "#7c5cfc" }}>
                {card.action}
              </button>
            </div>
          ))}
        </div>

        {/* Audit Log */}
        <div className="rounded-xl border overflow-hidden" style={{ background: "hsl(var(--admin-card))", borderColor: "hsl(var(--admin-border))" }}>
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "hsl(var(--admin-border))" }}>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" style={{ color: "#7c5cfc" }} />
              <h2 className="font-display font-semibold" style={{ color: "hsl(var(--admin-fg))" }}>Recent Activity</h2>
            </div>
            <button className="text-xs font-medium" style={{ color: "#7c5cfc" }}>View All Logs</button>
          </div>
          <div className="divide-y" style={{ borderColor: "hsl(var(--admin-border))" }}>
            {recentLogs.map((log, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-4 text-sm">
                <span className="text-xs w-16 shrink-0" style={{ color: "hsl(var(--admin-muted-fg))" }}>{log.time}</span>
                <span className="font-medium w-28 shrink-0" style={{ color: "hsl(var(--admin-fg))" }}>{log.user}</span>
                <span style={{ color: "hsl(var(--admin-muted-fg))" }}>{log.action}</span>
                <span className="ml-auto text-xs" style={{ color: "#7c5cfc" }}>{log.target}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
