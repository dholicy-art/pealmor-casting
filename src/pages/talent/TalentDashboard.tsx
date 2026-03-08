import TalentLayout from "@/components/layouts/TalentLayout";
import { DollarSign, Eye, FileCheck, AlertTriangle, TrendingUp } from "lucide-react";

const requests = [
  { id: "r1", company: "LuxeBeauty", project: "Summer Campaign", purpose: "Ad", fee: "$2,400", status: "Pending" },
  { id: "r2", company: "TechFlow", project: "Product Demo", purpose: "Educational", fee: "$1,800", status: "Pending" },
  { id: "r3", company: "NovaSkin", project: "Brand Video", purpose: "Short-form", fee: "$1,200", status: "Approved" },
];

export default function TalentDashboard() {
  return (
    <TalentLayout>
      <div className="p-6 lg:p-8 space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, Yuna</h1>
          <p className="text-muted-foreground text-sm mt-1">Your AI talent dashboard</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: FileCheck, label: "Pending Requests", value: "2", color: "text-warning" },
            { icon: Eye, label: "Profile Views", value: "347", color: "text-info" },
            { icon: DollarSign, label: "This Month", value: "$4,200", color: "text-success" },
            { icon: AlertTriangle, label: "Policy Alerts", value: "0", color: "text-muted-foreground" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-5 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Earnings Chart Placeholder */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-foreground">Earnings Overview</h2>
            <div className="flex items-center gap-1 text-sm text-success">
              <TrendingUp className="w-4 h-4" />
              <span>+23% this month</span>
            </div>
          </div>
          <div className="h-48 rounded-lg bg-secondary/30 flex items-center justify-center text-muted-foreground text-sm">
            Revenue chart visualization
          </div>
        </div>

        {/* Recent Requests */}
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Recent Requests</h2>
          <div className="space-y-3">
            {requests.map((r) => (
              <div key={r.id} className="bg-card rounded-xl p-5 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm">{r.company}</h3>
                    <span className="text-xs text-muted-foreground">— {r.project}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{r.purpose}</span>
                    <span>•</span>
                    <span className="font-medium text-foreground">{r.fee}</span>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  r.status === "Pending" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                }`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Completeness */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display font-semibold text-foreground mb-3">Profile Completeness</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full w-[85%] rounded-full gradient-accent" />
            </div>
            <span className="text-sm font-medium text-foreground">85%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Add voice samples to reach 100%</p>
        </div>
      </div>
    </TalentLayout>
  );
}
