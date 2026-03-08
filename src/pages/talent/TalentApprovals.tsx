import TalentLayout from "@/components/layouts/TalentLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, MessageSquare, AlertTriangle, Shield } from "lucide-react";

const requests = [
  {
    id: "r1",
    company: "LuxeBeauty Co.",
    project: "Summer Campaign 2026",
    purpose: "Commercial Ad",
    assets: ["Face", "Voice"],
    channels: ["YouTube", "Instagram"],
    region: "Korea, Japan",
    term: "60 days",
    fee: "$2,400",
    revenueShare: "15%",
    riskLevel: "Low",
    policyConflict: false,
  },
  {
    id: "r2",
    company: "TechFlow Inc.",
    project: "AI Product Demo",
    purpose: "Educational / Demo",
    assets: ["Face", "Voice", "Persona"],
    channels: ["Website", "YouTube"],
    region: "Global",
    term: "90 days",
    fee: "$1,800",
    revenueShare: "—",
    riskLevel: "Medium",
    policyConflict: true,
  },
];

export default function TalentApprovals() {
  return (
    <TalentLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Approval Center</h1>
          <p className="text-muted-foreground text-sm mt-1">Review and manage incoming casting requests</p>
        </div>

        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r.id} className="bg-card rounded-xl border border-border p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-display font-semibold text-lg text-foreground">{r.company}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      r.riskLevel === "Low" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}>
                      {r.riskLevel} Risk
                    </span>
                    {r.policyConflict && (
                      <span className="flex items-center gap-1 text-xs text-destructive">
                        <AlertTriangle className="w-3 h-3" /> Policy Conflict
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{r.project} — {r.purpose}</p>
                </div>
                <p className="font-display text-xl font-bold text-foreground">{r.fee}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5 text-sm">
                <div>
                  <span className="text-muted-foreground text-xs">Assets</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {r.assets.map((a) => (
                      <span key={a} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">{a}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Channels</span>
                  <p className="text-foreground mt-1">{r.channels.join(", ")}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Region</span>
                  <p className="text-foreground mt-1">{r.region}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Term</span>
                  <p className="text-foreground mt-1">{r.term}</p>
                </div>
              </div>

              {r.policyConflict && (
                <div className="bg-destructive/5 rounded-lg p-3 mb-4 flex items-start gap-2">
                  <Shield className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <p className="text-xs text-destructive">
                    Global region exceeds your policy limit (KR, JP, SEA only). You may counter-offer with restricted regions.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                <Button variant="hero" size="sm"><CheckCircle className="w-4 h-4" /> Approve</Button>
                <Button variant="destructive" size="sm"><XCircle className="w-4 h-4" /> Reject</Button>
                <Button variant="glass" size="sm"><MessageSquare className="w-4 h-4" /> Counter-Offer</Button>
                <Button variant="ghost" size="sm">Request Admin Review</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TalentLayout>
  );
}
