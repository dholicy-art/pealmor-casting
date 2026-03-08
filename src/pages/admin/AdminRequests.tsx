import AdminLayout from "@/components/layouts/AdminLayout";
import { usePlatformStore } from "@/store/platformStore";
import { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function AdminRequests() {
  const { requests, updateRequestStatus } = usePlatformStore();
  const [filter, setFilter] = useState("all");
  const fg = "hsl(var(--admin-fg))";
  const mfg = "hsl(var(--admin-muted-fg))";
  const card = "hsl(var(--admin-card))";
  const border = "hsl(var(--admin-border))";

  const filtered = filter === "all" ? requests : requests.filter((r) => {
    if (filter === "flagged") return r.policyConflicts.length > 0;
    return r.status === filter;
  });

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    counter_offered: "bg-blue-100 text-blue-800",
    cancelled: "bg-gray-100 text-gray-700",
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: fg }}>Request Review</h1>
          <p className="text-sm mt-1" style={{ color: mfg }}>{requests.length} total requests</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "flagged", "approved", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === f ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f === "flagged" ? `Flagged (${requests.filter((r) => r.policyConflicts.length > 0).length})` :
               f === "all" ? `All (${requests.length})` :
               `${f} (${requests.filter((r) => r.status === f).length})`}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((r) => (
            <div key={r.id} className="rounded-xl border p-5" style={{ background: card, borderColor: border }}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold" style={{ color: fg }}>{r.companyName} → {r.talentName}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[r.status]}`}>
                      {r.status.replace("_", " ")}
                    </span>
                    {r.policyConflicts.length > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-800 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> {r.policyConflicts.length} conflict(s)
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-1" style={{ color: mfg }}>
                    {r.projectTitle} • {r.requestedPurpose} • {r.requestedRegions} • {r.requestedTermDays}d • ${r.proposedFee.toLocaleString()}
                  </p>
                </div>
              </div>

              {r.policyConflicts.length > 0 && (
                <div className="bg-red-50 rounded-lg p-3 mb-3">
                  {r.policyConflicts.map((c, i) => (
                    <p key={i} className="text-xs text-red-700">⚠ {c}</p>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                {r.status === "pending" && (
                  <>
                    <button
                      onClick={() => { updateRequestStatus(r.id, "approved"); toast.success("요청 승인됨"); }}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" /> Force Approve
                    </button>
                    <button
                      onClick={() => { updateRequestStatus(r.id, "rejected"); toast.info("요청 거부됨"); }}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"
                    >
                      <XCircle className="w-3 h-3" /> Force Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 rounded-xl border" style={{ background: card, borderColor: border }}>
              <p style={{ color: mfg }}>No requests matching this filter.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
