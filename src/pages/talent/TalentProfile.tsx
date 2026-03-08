import TalentLayout from "@/components/layouts/TalentLayout";
import { Button } from "@/components/ui/button";
import { Edit, Camera, Mic, User, Shield } from "lucide-react";

export default function TalentProfile() {
  return (
    <TalentLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your public profile and AI assets</p>
          </div>
          <Button variant="hero" size="sm"><Edit className="w-4 h-4" /> Edit Profile</Button>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center font-display font-bold text-3xl text-secondary-foreground shrink-0">
              YP
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display text-xl font-bold text-foreground">Yuna Park</h2>
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">
                  <Shield className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Elegant, sophisticated AI persona for premium brands</p>
              <div className="flex flex-wrap gap-2">
                {["Korean", "20s", "Elegant", "Luxury", "Ad-ready", "English OK"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Assets */}
        <div>
          <h2 className="font-display font-semibold text-foreground mb-4">AI Assets</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Camera, type: "Face Image Set", status: "Active", quality: "A+", files: 24 },
              { icon: Mic, type: "Voice Clone", status: "Active", quality: "A", files: 8 },
              { icon: User, type: "Persona Model", status: "Active", quality: "A+", files: 1 },
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
                  <span>Quality: {asset.quality}</span>
                  <span>{asset.files} files</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consent Policy Summary */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">Consent Policy</h2>
            <Button variant="glass" size="sm">Edit Policy</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground text-xs">Allowed Purposes</span>
              <p className="text-foreground mt-1">Ads, Education, Short-form, Chatbot</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Blocked Purposes</span>
              <p className="text-destructive mt-1">Political, Adult, Violence</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Allowed Regions</span>
              <p className="text-foreground mt-1">KR, JP, SEA</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Max Term</span>
              <p className="text-foreground mt-1">90 days</p>
            </div>
          </div>
        </div>
      </div>
    </TalentLayout>
  );
}
