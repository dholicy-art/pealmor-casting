import TalentLayout from "@/components/layouts/TalentLayout";
import { Link } from "react-router-dom";
import { DollarSign, Eye, FileCheck, AlertTriangle, TrendingUp, ArrowRight, Shield } from "lucide-react";
import { usePlatformStore } from "@/store/platformStore";
import { getLocalizedTalents } from "@/data/localizedData";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nContext";
import { useEffect, useState, useMemo } from "react";
import { getSettlementStatus } from "@/services/pealmorApi";
import type { PealmorSettlement } from "@/types/pealmor";

export default function TalentDashboard() {
  const { t, language } = useI18n();
  const talents = useMemo(() => getLocalizedTalents(language), [language]);
  const currentTalent = talents[0];
  const allRequests = usePlatformStore((s) => s.requests);
  const requests = allRequests.filter((r) => r.talentId === "t1");
  const pendingRequests = requests.filter((r) => r.status === "pending");
  const [settlements, setSettlements] = useState<PealmorSettlement[]>([]);

  useEffect(() => {
    getSettlementStatus("t1").then(setSettlements);
  }, []);

  const completedSettlements = settlements.filter((s) => s.status === "completed");
  const totalEarnings = completedSettlements.reduce((sum, s) => sum + s.netAmount, 0);
  const latestMonth = completedSettlements[0];
  const monthlyEarnings = latestMonth?.netAmount || 0;

  return (
    <TalentLayout>
      <div className="p-6 lg:p-8 space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t.talent.welcomeBack} {currentTalent.stageName}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t.talent.yourDashboard}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: FileCheck, label: t.talent.pendingRequests, value: String(pendingRequests.length), color: "text-warning" },
            { icon: Eye, label: t.talent.profileViews, value: String(currentTalent.profileViews), color: "text-info" },
            { icon: DollarSign, label: t.talent.thisMonth, value: `$${monthlyEarnings.toLocaleString()}`, color: "text-success", sub: "via PEALMOR" },
            { icon: AlertTriangle, label: t.talent.policyAlerts, value: String(requests.filter((r) => r.policyConflicts.length > 0).length), color: "text-destructive" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-5 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
              {"sub" in s && <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><Shield className="w-2.5 h-2.5" />{s.sub}</p>}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-semibold text-foreground">{t.talent.earningsOverview}</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">PEALMOR Settlement</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-success"><TrendingUp className="w-4 h-4" /></div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {completedSettlements.slice(0, 4).reverse().map((s) => (
              <div key={s.id} className="text-center">
                <div className="h-32 flex items-end justify-center mb-2">
                  <div className="w-10 rounded-t-lg gradient-primary" style={{ height: `${(s.netAmount / (Math.max(...completedSettlements.map(x => x.netAmount)) || 1)) * 100}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">{s.period.slice(0, 3)}</p>
                <p className="text-xs font-medium text-foreground">${s.netAmount.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">{t.talent.totalEarnings}</p>
              <p className="font-display text-lg font-bold text-foreground">${totalEarnings.toLocaleString()}</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/talent/earnings">{t.common.viewAll} <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">{t.talent.recentRequests}</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/talent/approvals">{t.common.viewAll} <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </div>
          <div className="space-y-3">
            {requests.slice(0, 3).map((r) => (
              <Link key={r.id} to="/talent/approvals" className="bg-card rounded-xl p-5 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-accent/30 transition-colors block">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm">{r.companyName}</h3>
                    <span className="text-xs text-muted-foreground">— {r.projectTitle}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{r.requestedPurpose}</span><span>•</span>
                    <span className="font-medium text-foreground">${r.proposedFee.toLocaleString()}</span>
                    {r.policyConflicts.length > 0 && (<><span>•</span><span className="text-destructive flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {t.talent.policyConflict}</span></>)}
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${r.status === "pending" ? "bg-warning/10 text-warning" : r.status === "approved" ? "bg-success/10 text-success" : r.status === "rejected" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>{r.status}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display font-semibold text-foreground mb-3">{t.talent.profileCompleteness}</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full gradient-accent" style={{ width: `${currentTalent.profileCompleteness}%` }} />
            </div>
            <span className="text-sm font-medium text-foreground">{currentTalent.profileCompleteness}%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {currentTalent.profileCompleteness < 100 ? t.talent.addVoiceSamples : t.talent.profileComplete}
          </p>
        </div>
      </div>
    </TalentLayout>
  );
}
