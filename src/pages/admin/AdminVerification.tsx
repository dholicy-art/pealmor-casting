import AdminLayout from "@/components/layouts/AdminLayout";
import { verificationCases } from "@/data/mockData";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle, XCircle, AlertTriangle, FileText, Eye } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

export default function AdminVerification() {
  const { t } = useI18n();
  const [cases, setCases] = useState(verificationCases);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = cases.find((c) => c.id === selectedId);

  const handleVerify = (id: string) => {
    setCases((prev) => prev.map((c) => c.id === id ? { ...c, status: "verified" as const } : c));
    toast.success(t.toast.verificationApproved);
  };

  const handleReject = (id: string) => {
    setCases((prev) => prev.map((c) => c.id === id ? { ...c, status: "rejected" as const } : c));
    toast.info(t.toast.verificationRejected);
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t.admin.verificationQueue}</h1>
          <p className="text-sm mt-1 text-muted-foreground">{cases.filter((c) => c.status === "pending").length} {t.admin.pendingVerifications.toLowerCase()}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-2">
            {cases.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`w-full text-start rounded-xl p-4 border border-border bg-card transition-all ${
                  selectedId === c.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{c.userName}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    c.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    c.status === "verified" ? "bg-green-100 text-green-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs capitalize text-muted-foreground">{c.userType}</span>
                  <span className="text-xs text-muted-foreground">• {c.submittedAt}</span>
                </div>
                {c.riskFlags.length > 0 && (
                  <div className="flex items-center gap-1 mt-2">
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                    <span className="text-[10px] text-red-500">{c.riskFlags.length} flag(s)</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            {selected ? (
              <div className="rounded-xl border border-border bg-card p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-lg font-bold text-foreground">{selected.userName}</h2>
                    <p className="text-sm capitalize text-muted-foreground">{selected.userType} • {selected.submittedAt}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    selected.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    selected.status === "verified" ? "bg-green-100 text-green-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {selected.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2 text-foreground">{t.admin.documents}</h3>
                  <div className="space-y-2">
                    {selected.documents.map((doc) => (
                      <div key={doc} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm flex-1 text-foreground">{doc}</span>
                        <button className="text-xs flex items-center gap-1 text-primary">
                          <Eye className="w-3 h-3" /> {t.common.viewAll}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {selected.riskFlags.length > 0 && (
                  <div className="bg-red-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-red-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> {t.admin.riskFlags}
                    </h3>
                    <ul className="space-y-1">
                      {selected.riskFlags.map((f) => (
                        <li key={f} className="text-xs text-red-700">• {f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selected.notes && (
                  <div>
                    <h3 className="text-sm font-medium mb-1 text-foreground">{t.admin.notes}</h3>
                    <p className="text-xs text-muted-foreground">{selected.notes}</p>
                  </div>
                )}

                {selected.status === "pending" && (
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <button
                      onClick={() => handleVerify(selected.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" /> {t.talent.approve}
                    </button>
                    <button
                      onClick={() => handleReject(selected.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-4 h-4" /> {t.talent.reject}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border text-muted-foreground">
                      {t.admin.requestMoreInfo}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <p className="text-muted-foreground">{t.admin.selectCase}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
