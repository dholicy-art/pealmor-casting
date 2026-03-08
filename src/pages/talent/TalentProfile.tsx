import TalentLayout from "@/components/layouts/TalentLayout";
import { Button } from "@/components/ui/button";
import { Edit, Camera, Mic, User, Shield } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

export default function TalentProfile() {
  const { t } = useI18n();

  return (
    <TalentLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{t.talent.myProfile}</h1>
            <p className="text-muted-foreground text-sm mt-1">{t.talent.manageProfile}</p>
          </div>
          <Button variant="hero" size="sm"><Edit className="w-4 h-4" /> {t.talent.editProfile}</Button>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center font-display font-bold text-3xl text-secondary-foreground shrink-0">
              YP
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display text-xl font-bold text-foreground">Yuna Park</h2>
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">
                  <Shield className="w-3 h-3" /> {t.client.verified}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Elegant, sophisticated AI persona for premium brands</p>
              <div className="flex flex-wrap gap-2">
                {["Korean", "20s", "Elegant", "Luxury", "Ad-ready", "English OK"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display font-semibold text-foreground mb-4">{t.talent.aiAssets}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Camera, type: "Face Image Set", status: t.common.active, quality: "A+", files: 24 },
              { icon: Mic, type: "Voice Clone", status: t.common.active, quality: "A", files: 8 },
              { icon: User, type: "Persona Model", status: t.common.active, quality: "A+", files: 1 },
            ].map((asset) => (
              <div key={asset.type} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <asset.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{asset.type}</p>
                    <p className="text-xs text-success">{asset.status}</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t.talent.quality}: {asset.quality}</span>
                  <span>{asset.files} {t.talent.files}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">{t.talent.consentPolicy}</h2>
            <Button variant="glass" size="sm">{t.talent.editPolicy}</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground text-xs">{t.client.allowedPurposes}</span>
              <p className="text-foreground mt-1">Ads, Education, Short-form, Chatbot</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">{t.client.blockedPurposes}</span>
              <p className="text-destructive mt-1">Political, Adult, Violence</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">{t.client.allowedRegions}</span>
              <p className="text-foreground mt-1">KR, JP, SEA</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">{t.client.maxTerm}</span>
              <p className="text-foreground mt-1">90 days</p>
            </div>
          </div>
        </div>
      </div>
    </TalentLayout>
  );
}
