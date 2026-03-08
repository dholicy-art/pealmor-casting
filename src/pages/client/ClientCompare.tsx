import ClientLayout from "@/components/layouts/ClientLayout";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, XCircle, Clock, X, ArrowRight } from "lucide-react";
import { usePlatformStore } from "@/store/platformStore";
import { getLocalizedTalentById } from "@/data/localizedData";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useI18n } from "@/i18n/I18nContext";

export default function ClientCompare() {
  const { t } = useI18n();
  const { compareTalents, removeFromCompare, clearCompare } = usePlatformStore();
  const actors = compareTalents.map(getTalentById).filter(Boolean);

  if (actors.length === 0) {
    return (
      <ClientLayout>
        <div className="p-6 lg:p-8 text-center py-20">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">{t.client.compareActors}</h1>
          <p className="text-muted-foreground mb-6">{t.client.noActorsCompare}</p>
          <Button variant="hero" asChild><Link to="/client/search">{t.client.findActors} <ArrowRight className="w-4 h-4 ms-1" /></Link></Button>
        </div>
      </ClientLayout>
    );
  }

  const rows: { label: string; getValue: (t: NonNullable<ReturnType<typeof getTalentById>>) => string }[] = [
    { label: t.client.rating, getValue: (a) => `${a.rating} (${a.reviewCount})` },
    { label: t.client.mood, getValue: (a) => a.moodTags.join(", ") },
    { label: t.client.voice, getValue: (a) => a.voiceTags.join(", ") },
    { label: t.client.startingPrice, getValue: (a) => `$${a.startingPrice}+` },
    { label: t.client.avgApprovalTime, getValue: (a) => `${a.avgApprovalHours}h` },
    { label: t.client.languages, getValue: (a) => a.languages.join(", ") },
    { label: t.client.regions, getValue: (a) => a.consentPolicy.allowedRegions.join(", ") },
    { label: t.client.maxTerm, getValue: (a) => `${a.consentPolicy.maxTermDays} days` },
    { label: t.client.channels, getValue: (a) => a.consentPolicy.allowedChannels.join(", ") },
  ];

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{t.client.compareActors}</h1>
            <p className="text-muted-foreground text-sm mt-1">{actors.length} {t.client.actorsSelected}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { clearCompare(); toast.info(t.toast.compareCleared); }}>
            {t.client.clearAll}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="w-40 p-4 text-start text-xs text-muted-foreground font-medium" />
                {actors.map((a) => (
                  <th key={a!.id} className="p-4 text-center">
                    <div className="flex flex-col items-center gap-2 relative">
                      <button
                        onClick={() => { removeFromCompare(a!.id); toast.info(t.toast.removedFromCompare); }}
                        className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20"
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
                <td className="p-4 text-sm text-muted-foreground font-medium">{t.client.assets}</td>
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
                <td className="p-4 text-sm text-muted-foreground font-medium">{t.client.derivativeWorks}</td>
                {actors.map((a) => (
                  <td key={a!.id} className="p-4 text-center">
                    {a!.consentPolicy.derivativeAllowed === "yes" && <CheckCircle className="w-4 h-4 text-success mx-auto" />}
                    {a!.consentPolicy.derivativeAllowed === "no" && <XCircle className="w-4 h-4 text-destructive mx-auto" />}
                    {a!.consentPolicy.derivativeAllowed === "conditional" && <Clock className="w-4 h-4 text-warning mx-auto" />}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="p-4 text-sm text-muted-foreground font-medium">{t.client.blockedPurposes}</td>
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
                      <Link to={`/client/casting-request/${a!.id}`}>{t.client.cast}</Link>
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
