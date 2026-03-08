import AdminLayout from "@/components/layouts/AdminLayout";
import { auditLogs } from "@/data/mockData";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

export default function AdminAuditLogs() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const fg = "hsl(var(--admin-fg))";
  const mfg = "hsl(var(--admin-muted-fg))";
  const card = "hsl(var(--admin-card))";
  const border = "hsl(var(--admin-border))";

  const filtered = useMemo(() => {
    let result = auditLogs;
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((l) =>
        l.action.toLowerCase().includes(q) || l.userName.toLowerCase().includes(q) || l.target.toLowerCase().includes(q)
      );
    }
    if (severityFilter !== "all") result = result.filter((l) => l.severity === severityFilter);
    if (roleFilter !== "all") result = result.filter((l) => l.userRole === roleFilter);
    return result;
  }, [query, severityFilter, roleFilter]);

  const severityColors: Record<string, string> = {
    info: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    critical: "bg-red-100 text-red-800",
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: fg }}>{t.admin.auditLogs}</h1>
          <p className="text-sm mt-1" style={{ color: mfg }}>{auditLogs.length} {t.admin.totalEntries}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: mfg }} />
            <input
              type="text"
              placeholder={t.common.search + "..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-10 ps-10 pe-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              style={{ background: card, borderColor: border, color: fg }}
            />
          </div>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="h-10 px-3 rounded-lg border text-sm"
            style={{ background: card, borderColor: border, color: fg }}
          >
            <option value="all">{t.admin.allSeverity}</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-10 px-3 rounded-lg border text-sm"
            style={{ background: card, borderColor: border, color: fg }}
          >
            <option value="all">{t.admin.allRoles}</option>
            <option value="client">Client</option>
            <option value="talent">Talent</option>
            <option value="admin">Admin</option>
            <option value="system">System</option>
          </select>
        </div>

        <div className="rounded-xl border overflow-hidden" style={{ background: card, borderColor: border }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b" style={{ borderColor: border }}>
                  {[t.admin.time, t.admin.severity, t.admin.user, t.admin.role, t.admin.action, t.admin.target].map((h) => (
                    <th key={h} className="px-4 py-3 text-start text-xs font-medium" style={{ color: mfg }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((log) => (
                  <tr key={log.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors" style={{ borderColor: border }}>
                    <td className="px-4 py-3 text-xs" style={{ color: mfg }}>{log.timestamp}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${severityColors[log.severity]}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: fg }}>{log.userName}</td>
                    <td className="px-4 py-3 text-xs capitalize" style={{ color: mfg }}>{log.userRole}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: fg }}>{log.action}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#7c5cfc" }}>{log.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-8 text-center" style={{ color: mfg }}>{t.common.noResults}</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
