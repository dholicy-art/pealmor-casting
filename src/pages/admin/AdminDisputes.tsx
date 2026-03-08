import AdminLayout from "@/components/layouts/AdminLayout";
import { disputes } from "@/data/mockData";
import { useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/i18n/I18nContext";

const priorityColors: Record<string, string> = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

const statusColors: Record<string, string> = {
  open: "bg-yellow-100 text-yellow-800",
  investigating: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  escalated: "bg-red-100 text-red-800",
};

export default function AdminDisputes() {
  const { t } = useI18n();
  const [cases, setCases] = useState(disputes);
  const fg = "hsl(var(--admin-fg))";
  const mfg = "hsl(var(--admin-muted-fg))";
  const card = "hsl(var(--admin-card))";
  const border = "hsl(var(--admin-border))";

  const updateStatus = (id: string, status: "investigating" | "resolved" | "escalated") => {
    setCases((prev) => prev.map((d) => d.id === id ? { ...d, status } : d));
    toast.success(`${t.toast.disputeStatusChanged} "${status}"`);
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: fg }}>{t.admin.disputeCenter}</h1>
          <p className="text-sm mt-1" style={{ color: mfg }}>{cases.filter((d) => d.status !== "resolved").length} {t.admin.activeDisputes}</p>
        </div>

        <div className="space-y-4">
          {cases.map((d) => (
            <div key={d.id} className="rounded-xl border p-6" style={{ background: card, borderColor: border }}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="font-display font-semibold" style={{ color: fg }}>{d.title}</h3>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${priorityColors[d.priority]}`}>
                      {d.priority}
                    </span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${statusColors[d.status]}`}>
                      {d.status}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: mfg }}>
                    {d.type.replace(/_/g, " ")} • Reporter: {d.reporter} → {d.reported} • {d.createdAt}
                  </p>
                </div>
              </div>

              <p className="text-sm mb-4" style={{ color: mfg }}>{d.description}</p>

              {d.status !== "resolved" && (
                <div className="flex gap-2 pt-4 border-t" style={{ borderColor: border }}>
                  {d.status === "open" && (
                    <button
                      onClick={() => updateStatus(d.id, "investigating")}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {t.admin.startInvestigation}
                    </button>
                  )}
                  {d.status === "investigating" && (
                    <>
                      <button onClick={() => updateStatus(d.id, "resolved")} className="text-xs px-3 py-1.5 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700">
                        {t.admin.resolve}
                      </button>
                      <button onClick={() => updateStatus(d.id, "escalated")} className="text-xs px-3 py-1.5 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700">
                        {t.admin.escalate}
                      </button>
                    </>
                  )}
                  {d.status === "escalated" && (
                    <button onClick={() => updateStatus(d.id, "resolved")} className="text-xs px-3 py-1.5 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700">
                      {t.admin.resolve}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
