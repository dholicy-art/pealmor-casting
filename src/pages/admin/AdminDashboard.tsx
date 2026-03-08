import AdminLayout from "@/components/layouts/AdminLayout";
import { Users, AlertTriangle, FileCheck, DollarSign, ShieldCheck, ScrollText, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { auditLogs, verificationCases, disputes } from "@/data/mockData";
import { usePlatformStore } from "@/store/platformStore";
import { useI18n } from "@/i18n/I18nContext";

export default function AdminDashboard() {
  const { t } = useI18n();
  const requests = usePlatformStore((s) => s.requests);
  const pendingVerifications = verificationCases.filter((v) => v.status === "pending").length;
  const highRiskRequests = requests.filter((r) => r.riskLevel === "high" || r.policyConflicts.length > 0).length;
  const openDisputes = disputes.filter((d) => d.status === "open" || d.status === "investigating").length;
  const fg = "hsl(var(--admin-fg))"; const mfg = "hsl(var(--admin-muted-fg))";
  const card = "hsl(var(--admin-card))"; const border = "hsl(var(--admin-border))";

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: fg }}>{t.admin.dashboard}</h1>
          <p className="text-sm mt-1" style={{ color: mfg }}>{t.admin.overview}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, label: t.admin.pendingVerifications, value: String(pendingVerifications), color: "#7c5cfc", link: "/admin/verification" },
            { icon: AlertTriangle, label: t.admin.highRiskRequests, value: String(highRiskRequests), color: "#e5484d", link: "/admin/requests" },
            { icon: FileCheck, label: t.admin.openDisputes, value: String(openDisputes), color: "#f5a623", link: "/admin/disputes" },
            { icon: DollarSign, label: t.admin.pendingSettlements, value: "$24.5K", color: "#30a46c", link: "/admin" },
          ].map((s) => (
            <Link key={s.label} to={s.link} className="rounded-xl p-5 border hover:shadow-md transition-shadow" style={{ background: card, borderColor: border }}>
              <div className="flex items-center gap-3 mb-2"><s.icon className="w-4 h-4" style={{ color: s.color }} /><span className="text-xs" style={{ color: mfg }}>{s.label}</span></div>
              <p className="font-display text-2xl font-bold" style={{ color: fg }}>{s.value}</p>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, title: t.admin.verification, desc: `${pendingVerifications} ${t.admin.pendingVerifications.toLowerCase()}`, link: "/admin/verification" },
            { icon: AlertTriangle, title: t.admin.requestReview, desc: `${highRiskRequests} ${t.admin.highRiskRequests.toLowerCase()}`, link: "/admin/requests" },
            { icon: ScrollText, title: t.admin.disputes, desc: `${openDisputes} ${t.admin.openDisputes.toLowerCase()}`, link: "/admin/disputes" },
          ].map((c) => (
            <Link key={c.title} to={c.link} className="rounded-xl p-5 border hover:shadow-md transition-shadow" style={{ background: card, borderColor: border }}>
              <c.icon className="w-5 h-5 mb-3" style={{ color: "#7c5cfc" }} />
              <h3 className="font-display font-semibold mb-1" style={{ color: fg }}>{c.title}</h3>
              <p className="text-xs mb-3" style={{ color: mfg }}>{c.desc}</p>
              <span className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: "#7c5cfc10", color: "#7c5cfc" }}>→</span>
            </Link>
          ))}
        </div>

        <div className="rounded-xl border overflow-hidden" style={{ background: card, borderColor: border }}>
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: border }}>
            <div className="flex items-center gap-2"><Activity className="w-4 h-4" style={{ color: "#7c5cfc" }} /><h2 className="font-display font-semibold" style={{ color: fg }}>{t.admin.recentActivity}</h2></div>
            <Link to="/admin/audit" className="text-xs font-medium" style={{ color: "#7c5cfc" }}>{t.admin.viewAllLogs}</Link>
          </div>
          <div>
            {auditLogs.slice(0, 6).map((log) => (
              <div key={log.id} className="px-5 py-3 flex items-center gap-4 text-sm border-b last:border-0" style={{ borderColor: border }}>
                <span className="text-xs w-28 shrink-0" style={{ color: mfg }}>{log.timestamp}</span>
                <span className={`w-2 h-2 rounded-full shrink-0 ${log.severity === "critical" ? "bg-red-500" : log.severity === "warning" ? "bg-yellow-500" : "bg-green-500"}`} />
                <span className="font-medium w-24 shrink-0" style={{ color: fg }}>{log.userName}</span>
                <span className="flex-1" style={{ color: mfg }}>{log.action}</span>
                <span className="text-xs shrink-0" style={{ color: "#7c5cfc" }}>{log.target}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
