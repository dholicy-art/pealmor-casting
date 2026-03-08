import TalentLayout from "@/components/layouts/TalentLayout";
import { ArrowUpRight, ArrowDownRight, Shield, Clock, CheckCircle } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { useEffect, useState } from "react";
import { getSettlementStatus, getPaymentStatus } from "@/services/pealmorApi";
import type { PealmorSettlement, PealmorPayment } from "@/types/pealmor";

export default function TalentEarnings() {
  const { t } = useI18n();
  const [settlements, setSettlements] = useState<PealmorSettlement[]>([]);
  const [payments, setPayments] = useState<PealmorPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getSettlementStatus("t1"),
      getPaymentStatus(),
    ]).then(([s, p]) => {
      setSettlements(s);
      setPayments(p);
      setLoading(false);
    });
  }, []);

  const completed = settlements.filter((s) => s.status === "completed");
  const pending = settlements.filter((s) => s.status === "pending");
  const totalEarnings = completed.reduce((sum, s) => sum + s.netAmount, 0);
  const latestMonth = completed[0];
  const pendingAmount = pending.reduce((sum, s) => sum + s.netAmount, 0);

  if (loading) {
    return (
      <TalentLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center py-20">
          <p className="text-muted-foreground">{t.common.loading}</p>
        </div>
      </TalentLayout>
    );
  }

  return (
    <TalentLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t.talent.earnings}</h1>
          <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
            <Shield className="w-3 h-3" />
            {t.client.revenueDashboard}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-5 border border-border">
            <p className="text-xs text-muted-foreground mb-2">{t.talent.totalEarnings}</p>
            <p className="font-display text-2xl font-bold text-foreground">${totalEarnings.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground mt-1">via PEALMOR Settlement</p>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border">
            <p className="text-xs text-muted-foreground mb-2">{t.talent.thisMonth}</p>
            <p className="font-display text-2xl font-bold text-foreground">${(latestMonth?.netAmount || 0).toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border">
            <p className="text-xs text-muted-foreground mb-2">{t.talent.pendingSettlement}</p>
            <p className="font-display text-2xl font-bold text-warning">${pendingAmount.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border">
            <p className="text-xs text-muted-foreground mb-2">{t.client.paidSettlements}</p>
            <p className="font-display text-2xl font-bold text-success">{payments.filter((p) => p.status === "paid").length}</p>
          </div>
        </div>

        {/* Settlement History from PEALMOR */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-display font-semibold text-foreground">PEALMOR Settlement History</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">PEALMOR API</span>
          </div>
          <div className="space-y-3">
            {completed.map((s, i) => {
              const prev = completed[i + 1];
              const change = prev ? ((s.netAmount - prev.netAmount) / prev.netAmount * 100) : 0;
              return (
                <div key={s.id} className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-20 shrink-0">{s.period.slice(0, 3)}</span>
                  <div className="flex-1 h-6 bg-secondary/50 rounded-full overflow-hidden">
                    <div className="h-full rounded-full gradient-primary" style={{ width: `${(s.netAmount / (Math.max(...completed.map(x => x.netAmount)) || 1)) * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium text-foreground w-20 text-end">${s.netAmount.toLocaleString()}</span>
                  {change !== 0 && (
                    <span className={`text-xs w-14 text-end flex items-center justify-end gap-0.5 ${change >= 0 ? "text-success" : "text-destructive"}`}>
                      {change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {Math.abs(change).toFixed(1)}%
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-muted-foreground w-32 text-end">{s.pealmorRef}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settlement Line Items */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display font-semibold text-foreground mb-4">Settlement Details</h2>
          <div className="space-y-3">
            {settlements.map((s) => (
              <div key={s.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{s.period}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      s.status === "completed" ? "bg-success/10 text-success" : s.status === "pending" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"
                    }`}>
                      {s.status === "completed" ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <Clock className="w-3 h-3 inline mr-1" />}
                      {s.status}
                    </span>
                  </div>
                  <div className="text-end">
                    <p className="font-display font-bold text-foreground">${s.netAmount.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">Fee: ${s.platformFee.toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {s.items.map((item) => (
                    <div key={item.licenseId} className="flex items-center justify-between text-xs text-muted-foreground py-1 border-t border-border/50">
                      <span>{item.projectTitle} — {item.clientName}</span>
                      <span className="text-foreground font-medium">${item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Status from PEALMOR */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-display font-semibold text-foreground">PEALMOR Payment Status</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">Read-only</span>
          </div>
          <div className="space-y-2">
            {payments.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">${p.amount.toLocaleString()} {p.currency}</p>
                  <p className="text-xs text-muted-foreground">{p.method} • {p.processedAt || "Processing..."}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    p.status === "paid" ? "bg-success/10 text-success" : p.status === "pending" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                  }`}>{p.status}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{p.pealmorRef}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TalentLayout>
  );
}
