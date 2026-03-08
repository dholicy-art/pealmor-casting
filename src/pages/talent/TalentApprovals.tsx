import TalentLayout from "@/components/layouts/TalentLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, MessageSquare, AlertTriangle, Shield } from "lucide-react";
import { usePlatformStore } from "@/store/platformStore";
import { toast } from "sonner";
import { useState } from "react";
import { useI18n } from "@/i18n/I18nContext";

export default function TalentApprovals() {
  const { t } = useI18n();
  const { requests, updateRequestStatus, addNotification } = usePlatformStore();
  const talentRequests = requests.filter((r) => r.talentId === "t1");
  const [counterModal, setCounterModal] = useState<string | null>(null);
  const [counterNotes, setCounterNotes] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? talentRequests : talentRequests.filter((r) => r.status === filter);

  const handleApprove = (requestId: string, companyName: string) => {
    updateRequestStatus(requestId, "approved");
    addNotification({ id: `n${Date.now()}`, title: t.toast.requestApproved, message: `${companyName}`, type: "approval", read: false, createdAt: new Date().toISOString() });
    toast.success(t.toast.requestApproved);
  };

  const handleReject = (requestId: string, companyName: string) => {
    updateRequestStatus(requestId, "rejected");
    addNotification({ id: `n${Date.now()}`, title: t.toast.requestRejected, message: `${companyName}`, type: "rejection", read: false, createdAt: new Date().toISOString() });
    toast.info(t.toast.requestRejected);
  };

  const handleCounterOffer = (requestId: string) => {
    if (!counterNotes.trim()) { toast.error(t.toast.enterConditions); return; }
    updateRequestStatus(requestId, "counter_offered", counterNotes);
    addNotification({ id: `n${Date.now()}`, title: t.toast.counterOfferSent, message: counterNotes, type: "request", read: false, createdAt: new Date().toISOString() });
    setCounterModal(null); setCounterNotes("");
    toast.success(t.toast.counterOfferSent);
  };

  return (
    <TalentLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t.talent.approvalCenter}</h1>
          <p className="text-muted-foreground text-sm mt-1">{talentRequests.length} {t.talent.totalRequests}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "approved", "rejected", "counter_offered"].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === s ? "gradient-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {s === "all" ? `${t.common.all} (${talentRequests.length})` : `${s.replace("_", " ")} (${talentRequests.filter((r) => r.status === s).length})`}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((r) => (
            <div key={r.id} className="bg-card rounded-xl border border-border p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="font-display font-semibold text-lg text-foreground">{r.companyName}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${r.riskLevel === "low" ? "bg-success/10 text-success" : r.riskLevel === "medium" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>{r.riskLevel} {t.talent.risk}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${r.status === "pending" ? "bg-warning/10 text-warning" : r.status === "approved" ? "bg-success/10 text-success" : r.status === "rejected" ? "bg-destructive/10 text-destructive" : "bg-info/10 text-info"}`}>{r.status.replace("_", " ")}</span>
                    {r.policyConflicts.length > 0 && <span className="flex items-center gap-1 text-xs text-destructive"><AlertTriangle className="w-3 h-3" /> {t.talent.policyConflict}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{r.projectTitle} — {r.requestedPurpose}</p>
                </div>
                <p className="font-display text-xl font-bold text-foreground">${r.proposedFee.toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5 text-sm">
                <div><span className="text-muted-foreground text-xs">{t.client.assets}</span><div className="flex flex-wrap gap-1 mt-1">{r.requestedAssets.map((a) => <span key={a} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium capitalize">{a}</span>)}</div></div>
                <div><span className="text-muted-foreground text-xs">{t.client.channels}</span><p className="text-foreground mt-1">{r.requestedChannels.join(", ")}</p></div>
                <div><span className="text-muted-foreground text-xs">{t.talent.region}</span><p className="text-foreground mt-1">{r.requestedRegions}</p></div>
                <div><span className="text-muted-foreground text-xs">{t.talent.term}</span><p className="text-foreground mt-1">{r.requestedTermDays} days</p></div>
              </div>

              {r.notes && <p className="text-sm text-muted-foreground mb-4 italic">"{r.notes}"</p>}
              {r.policyConflicts.length > 0 && (
                <div className="bg-destructive/5 rounded-lg p-3 mb-4 flex items-start gap-2">
                  <Shield className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <div>{r.policyConflicts.map((c, i) => <p key={i} className="text-xs text-destructive">{c}</p>)}</div>
                </div>
              )}
              {r.counterOfferNotes && (
                <div className="bg-info/5 rounded-lg p-3 mb-4">
                  <p className="text-xs font-medium text-info mb-1">{t.talent.counterOfferConditions}:</p>
                  <p className="text-xs text-foreground">{r.counterOfferNotes}</p>
                </div>
              )}

              {r.status === "pending" && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  <Button variant="hero" size="sm" onClick={() => handleApprove(r.id, r.companyName)}><CheckCircle className="w-4 h-4" /> {t.talent.approve}</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleReject(r.id, r.companyName)}><XCircle className="w-4 h-4" /> {t.talent.reject}</Button>
                  <Button variant="glass" size="sm" onClick={() => { setCounterModal(r.id); setCounterNotes(""); }}><MessageSquare className="w-4 h-4" /> {t.talent.counterOffer}</Button>
                </div>
              )}

              {counterModal === r.id && (
                <div className="mt-4 bg-secondary/50 rounded-lg p-4 space-y-3">
                  <p className="text-sm font-medium text-foreground">{t.talent.counterOfferConditions}</p>
                  <textarea rows={3} placeholder="e.g., Japan only, face only (no voice), 30 days max..." value={counterNotes} onChange={(e) => setCounterNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                  <div className="flex gap-2">
                    <Button variant="hero" size="sm" onClick={() => handleCounterOffer(r.id)}>{t.talent.sendCounterOffer}</Button>
                    <Button variant="ghost" size="sm" onClick={() => setCounterModal(null)}>{t.common.cancel}</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <div className="text-center py-12"><p className="text-muted-foreground">{t.common.noResults}</p></div>}
        </div>
      </div>
    </TalentLayout>
  );
}
