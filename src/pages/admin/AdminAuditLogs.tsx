import AdminLayout from "@/components/layouts/AdminLayout";
import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { getAuditLog } from "@/services/pealmorApi";
import type { PealmorAuditEntry } from "@/types/pealmor";

export default function AdminAuditLogs() {
  const { t } = useI18n();
  const [logs, setLogs] = useState<PealmorAuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  useEffect(() => {
    getAuditLog().then((data) => { setLogs(data); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    let result = logs;
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((l) =>
        l.action.toLowerCase().includes(q) || l.userName.toLowerCase().includes(q) || l.target.toLowerCase().includes(q)
      );
    }
    if (severityFilter !== "all") result = result.filter((l) => l.severity === severityFilter);
    if (roleFilter !== "all") result = result.filter((l) => l.userRole === roleFilter);
    return result;
  }, [logs, query, severityFilter, roleFilter]);

  const severityColors: Record<string, string> = {
    info: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    critical: "bg-red-100 text-red-800",
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t.admin.auditLogs}</h1>
          <p className="text-sm mt-1 text-muted-foreground">
            {loading ? t.common.loading : `${logs.length} ${t.admin.totalEntries}`}
            <span className="ml-2 text-xs opacity-60">— via PEALMOR Audit API</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder={t.common.search + "..."} value={query} onChange={(e) => setQuery(e.target.value)}
              className="w-full h-10 ps-10 pe-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}
            className="h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm">
            <option value="all">{t.admin.allSeverity}</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
            className="h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm">
            <option value="all">{t.admin.allRoles}</option>
            <option value="client">Client</option>
            <option value="talent">Talent</option>
            <option value="admin">Admin</option>
            <option value="system">PEALMOR System</option>
          </select>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border">
                  {[t.admin.time, t.admin.severity, t.admin.user, t.admin.role, t.admin.action, t.admin.target, "PEALMOR Ref"].map((h) => (
                    <th key={h} className="px-4 py-3 text-start text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((log) => (
                  <tr key={log.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-xs text-muted-foreground">{log.timestamp}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${severityColors[log.severity]}`}>{log.severity}</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{log.userName}</td>
                    <td className="px-4 py-3 text-xs capitalize text-muted-foreground">{log.userRole}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{log.action}</td>
                    <td className="px-4 py-3 text-xs text-primary">{log.target}</td>
                    <td className="px-4 py-3 text-[10px] font-mono text-muted-foreground">{log.pealmorRef}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!loading && filtered.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">{t.common.noResults}</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
