import TalentLayout from "@/components/layouts/TalentLayout";
import { talents } from "@/data/mockData";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

const currentTalent = talents[0];

const monthlyData = [
  { month: "Oct 2025", amount: 2800, change: 0 },
  { month: "Nov 2025", amount: 3100, change: 10.7 },
  { month: "Dec 2025", amount: 3200, change: 3.2 },
  { month: "Jan 2026", amount: 3800, change: 18.8 },
  { month: "Feb 2026", amount: 3400, change: -10.5 },
  { month: "Mar 2026", amount: 4200, change: 23.5 },
];

const projectEarnings = [
  { project: "Holiday Short-form Series", brand: "LuxeBeauty", amount: 3500, date: "Dec 2025" },
  { project: "Product Launch Intro", brand: "NovaSkin", amount: 1200, date: "Feb 2026" },
  { project: "Brand Ambassador Video", brand: "TechFlow", amount: 1800, date: "Pending" },
];

export default function TalentEarnings() {
  const { t } = useI18n();

  return (
    <TalentLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t.talent.earnings}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t.talent.earningsOverview}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-5 border border-border">
            <p className="text-xs text-muted-foreground mb-2">{t.talent.totalEarnings}</p>
            <p className="font-display text-2xl font-bold text-foreground">${currentTalent.totalEarnings.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border">
            <p className="text-xs text-muted-foreground mb-2">{t.talent.thisMonth}</p>
            <div className="flex items-center gap-2">
              <p className="font-display text-2xl font-bold text-foreground">${currentTalent.monthlyEarnings.toLocaleString()}</p>
              <span className="text-xs text-success flex items-center gap-0.5"><TrendingUp className="w-3 h-3" />+23%</span>
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border">
            <p className="text-xs text-muted-foreground mb-2">{t.talent.availableWithdrawal}</p>
            <p className="font-display text-2xl font-bold text-success">$3,200</p>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border">
            <p className="text-xs text-muted-foreground mb-2">{t.talent.pendingSettlement}</p>
            <p className="font-display text-2xl font-bold text-warning">$1,800</p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display font-semibold text-foreground mb-4">{t.talent.monthlyRevenue}</h2>
          <div className="space-y-3">
            {monthlyData.map((m) => (
              <div key={m.month} className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-20 shrink-0">{m.month.slice(0, 3)}</span>
                <div className="flex-1 h-6 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full gradient-primary" style={{ width: `${(m.amount / 4200) * 100}%` }} />
                </div>
                <span className="text-sm font-medium text-foreground w-16 text-end">${m.amount.toLocaleString()}</span>
                <span className={`text-xs w-14 text-end flex items-center justify-end gap-0.5 ${m.change >= 0 ? "text-success" : "text-destructive"}`}>
                  {m.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(m.change)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display font-semibold text-foreground mb-4">{t.talent.projectEarnings}</h2>
          <div className="space-y-3">
            {projectEarnings.map((p) => (
              <div key={p.project} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.project}</p>
                  <p className="text-xs text-muted-foreground">{p.brand} • {p.date}</p>
                </div>
                <p className="font-display font-bold text-foreground">${p.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TalentLayout>
  );
}
