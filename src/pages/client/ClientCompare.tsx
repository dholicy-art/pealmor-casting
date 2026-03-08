import ClientLayout from "@/components/layouts/ClientLayout";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, XCircle, Clock, X, ArrowRight } from "lucide-react";
import { usePlatformStore } from "@/store/platformStore";
import { getTalentById } from "@/data/mockData";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ClientCompare() {
  const { compareTalents, removeFromCompare, clearCompare } = usePlatformStore();
  const actors = compareTalents.map(getTalentById).filter(Boolean);

  if (actors.length === 0) {
    return (
      <ClientLayout>
        <div className="p-6 lg:p-8 text-center py-20">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Compare AI Actors</h1>
          <p className="text-muted-foreground mb-6">No actors in your compare list yet.</p>
          <Button variant="hero" asChild><Link to="/client/search">Find Actors <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
        </div>
      </ClientLayout>
    );
  }

  const rows: { label: string; getValue: (t: NonNullable<ReturnType<typeof getTalentById>>) => string }[] = [
    { label: "Rating", getValue: (t) => `${t.rating} (${t.reviewCount})` },
    { label: "Mood", getValue: (t) => t.moodTags.join(", ") },
    { label: "Voice", getValue: (t) => t.voiceTags.join(", ") },
    { label: "Starting Price", getValue: (t) => `$${t.startingPrice}+` },
    { label: "Avg. Approval", getValue: (t) => `${t.avgApprovalHours}h` },
    { label: "Languages", getValue: (t) => t.languages.join(", ") },
    { label: "Regions", getValue: (t) => t.consentPolicy.allowedRegions.join(", ") },
    { label: "Max Term", getValue: (t) => `${t.consentPolicy.maxTermDays} days` },
    { label: "Channels", getValue: (t) => t.consentPolicy.allowedChannels.join(", ") },
  ];

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Compare AI Actors</h1>
            <p className="text-muted-foreground text-sm mt-1">{actors.length} actors selected (max 4)</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { clearCompare(); toast.info("비교 목록이 초기화되었습니다"); }}>
            Clear All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="w-40 p-4 text-left text-xs text-muted-foreground font-medium" />
                {actors.map((a) => (
                  <th key={a!.id} className="p-4 text-center">
                    <div className="flex flex-col items-center gap-2 relative">
                      <button
                        onClick={() => { removeFromCompare(a!.id); toast.info(`${a!.name} 제거됨`); }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <Link to={`/client/actor/${a!.id}`}>
                        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-xl text-secondary-foreground">
                          {a!.initials}
                        </div>
                      </Link>
                      <Link to={`/client/actor/${a!.id}`} className="font-display font-semibold text-foreground hover:text-primary transition-colors">{a!.name}</Link>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-warning fill-warning" />
                        <span className="text-xs text-muted-foreground">{a!.rating}</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="p-4 text-sm text-muted-foreground font-medium">{row.label}</td>
                  {actors.map((a) => (
                    <td key={a!.id} className="p-4 text-center text-sm text-foreground">{row.getValue(a!)}</td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-border">
                <td className="p-4 text-sm text-muted-foreground font-medium">Assets</td>
                {actors.map((a) => (
                  <td key={a!.id} className="p-4 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {a!.assets.map((asset) => (
                        <span key={asset.id} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium capitalize">{asset.type}</span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="p-4 text-sm text-muted-foreground font-medium">Derivative Works</td>
                {actors.map((a) => (
                  <td key={a!.id} className="p-4 text-center">
                    {a!.consentPolicy.derivativeAllowed === "yes" && <CheckCircle className="w-4 h-4 text-success mx-auto" />}
                    {a!.consentPolicy.derivativeAllowed === "no" && <XCircle className="w-4 h-4 text-destructive mx-auto" />}
                    {a!.consentPolicy.derivativeAllowed === "conditional" && <Clock className="w-4 h-4 text-warning mx-auto" />}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="p-4 text-sm text-muted-foreground font-medium">Blocked Purposes</td>
                {actors.map((a) => (
                  <td key={a!.id} className="p-4 text-center text-xs text-destructive">
                    {a!.consentPolicy.blockedPurposes.join(", ")}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="p-4" />
                {actors.map((a) => (
                  <td key={a!.id} className="p-4 text-center">
                    <Button variant="hero" size="sm" asChild>
                      <Link to={`/client/casting-request/${a!.id}`}>Cast</Link>
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ClientLayout>
  );
}
