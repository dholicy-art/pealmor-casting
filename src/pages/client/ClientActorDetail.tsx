import ClientLayout from "@/components/layouts/ClientLayout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Star, Bookmark, BookmarkCheck, Share2, Shield, CheckCircle, XCircle, Clock, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { getTalentById } from "@/data/mockData";
import { usePlatformStore } from "@/store/platformStore";
import { toast } from "sonner";

const tabs = ["Overview", "Samples", "Voice", "Persona", "Usage Policy", "Reviews"];

export default function ClientActorDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const talent = getTalentById(id || "");
  const { bookmarkedTalents, toggleBookmark, addToCompare, compareTalents } = usePlatformStore();

  if (!talent) {
    return (
      <ClientLayout>
        <div className="p-6 lg:p-8 text-center py-20">
          <p className="text-muted-foreground">Actor not found.</p>
          <Button variant="ghost" className="mt-4" asChild><Link to="/client/search">Back to Search</Link></Button>
        </div>
      </ClientLayout>
    );
  }

  const isBookmarked = bookmarkedTalents.includes(talent.id);
  const isInCompare = compareTalents.includes(talent.id);
  const policy = talent.consentPolicy;

  const policyDisplay = [
    ...policy.allowedPurposes.map((p) => ({ label: p, allowed: true as const })),
    ...policy.blockedPurposes.map((p) => ({ label: p, allowed: false as const })),
    { label: "Derivative Works", allowed: policy.derivativeAllowed === "yes" ? true as const : policy.derivativeAllowed === "no" ? false as const : ("conditional" as const) },
  ];

  const handleAddCompare = () => {
    if (isInCompare) {
      toast.info("이미 비교 목록에 있습니다");
      return;
    }
    if (compareTalents.length >= 4) {
      toast.error("비교는 최대 4명까지 가능합니다");
      return;
    }
    addToCompare(talent.id);
    toast.success(`${talent.name}을 비교 목록에 추가했습니다`);
  };

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/client/search"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Search</Link>
        </Button>

        <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-28 h-28 rounded-2xl bg-secondary flex items-center justify-center font-display font-bold text-3xl text-secondary-foreground shrink-0">
              {talent.initials}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="font-display text-2xl font-bold text-foreground">{talent.name}</h1>
                    {talent.verified && (
                      <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-success/10 text-success font-medium">
                        <Shield className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{talent.intro}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="font-semibold text-foreground">{talent.rating}</span>
                      <span className="text-muted-foreground">({talent.reviewCount} projects)</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" /> Avg. {talent.avgApprovalHours}h approval
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className={`flex items-center gap-1 ${talent.available ? "text-success" : "text-muted-foreground"}`}>
                      <span className={`w-2 h-2 rounded-full ${talent.available ? "bg-success" : "bg-muted-foreground"}`} />
                      {talent.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="glass" size="icon" onClick={() => { toggleBookmark(talent.id); toast.success(isBookmarked ? "북마크 해제" : "북마크 추가"); }}>
                    {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-accent" /> : <Bookmark className="w-4 h-4" />}
                  </Button>
                  <Button variant="glass" size="icon" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("링크가 복사되었습니다"); }}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {talent.tags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
            <Button variant="hero" className="flex-1 sm:flex-none" asChild>
              <Link to={`/client/casting-request/${talent.id}`}>Request Casting</Link>
            </Button>
            <Button variant="glass" onClick={handleAddCompare}>
              {isInCompare ? "In Compare List" : "Add to Compare"}
            </Button>
          </div>
        </div>

        <div className="flex gap-1 border-b border-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold mb-4 text-foreground">About</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{talent.intro}</p>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border text-sm">
                  <div><span className="text-muted-foreground">Nationality:</span> <span className="text-foreground">{talent.nationality}</span></div>
                  <div><span className="text-muted-foreground">Age Range:</span> <span className="text-foreground">{talent.ageRange}</span></div>
                  <div><span className="text-muted-foreground">Languages:</span> <span className="text-foreground">{talent.languages.join(", ")}</span></div>
                  <div><span className="text-muted-foreground">Gender:</span> <span className="text-foreground">{talent.genderExpression}</span></div>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold mb-4 text-foreground">Available Assets</h3>
                <div className="grid grid-cols-2 gap-3">
                  {talent.assets.map((asset) => (
                    <div key={asset.id} className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <p className="text-sm font-medium text-foreground">{asset.label}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${asset.status === "active" ? "text-success" : "text-muted-foreground"}`}>
                          {asset.status === "active" ? "Ready" : asset.status}
                        </span>
                        <span className="text-xs text-muted-foreground">Quality: {asset.quality}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold mb-4 text-foreground">Usage Policy</h3>
                <div className="space-y-2">
                  {policyDisplay.map((p) => (
                    <div key={p.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{p.label}</span>
                      {p.allowed === true && <CheckCircle className="w-4 h-4 text-success" />}
                      {p.allowed === false && <XCircle className="w-4 h-4 text-destructive" />}
                      {p.allowed === "conditional" && <Clock className="w-4 h-4 text-warning" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold mb-3 text-foreground">Pricing</h3>
                <p className="text-2xl font-display font-bold text-foreground">${talent.startingPrice}+</p>
                <p className="text-xs text-muted-foreground mt-1">Starting price per project</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Max Term</span><span className="text-foreground">{policy.maxTermDays} days</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Regions</span><span className="text-foreground">{policy.allowedRegions.join(", ")}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Voice Clone</span><span className="text-foreground">{policy.voiceCloneAllowed ? "Allowed" : "Not Allowed"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Usage Policy" && (
          <div className="bg-card rounded-xl border border-border p-6 space-y-6">
            <div>
              <h3 className="font-display font-semibold mb-3 text-foreground">Allowed Purposes</h3>
              <div className="flex flex-wrap gap-2">
                {policy.allowedPurposes.map((p) => (
                  <span key={p} className="text-xs px-3 py-1.5 rounded-full bg-success/10 text-success font-medium">{p}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-3 text-foreground">Blocked Purposes</h3>
              <div className="flex flex-wrap gap-2">
                {policy.blockedPurposes.map((p) => (
                  <span key={p} className="text-xs px-3 py-1.5 rounded-full bg-destructive/10 text-destructive font-medium">{p}</span>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-display font-semibold mb-3 text-foreground">Allowed Regions</h3>
                <div className="flex flex-wrap gap-2">
                  {policy.allowedRegions.map((r) => (
                    <span key={r} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">{r}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display font-semibold mb-3 text-foreground">Allowed Channels</h3>
                <div className="flex flex-wrap gap-2">
                  {policy.allowedChannels.map((c) => (
                    <span key={c} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">{c}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border text-sm">
              <div><span className="text-muted-foreground text-xs block">Max Term</span><span className="text-foreground font-medium">{policy.maxTermDays} days</span></div>
              <div><span className="text-muted-foreground text-xs block">Derivative Works</span><span className="text-foreground font-medium capitalize">{policy.derivativeAllowed}</span></div>
              <div><span className="text-muted-foreground text-xs block">Voice Clone</span><span className="text-foreground font-medium">{policy.voiceCloneAllowed ? "Yes" : "No"}</span></div>
              <div><span className="text-muted-foreground text-xs block">Face Swap</span><span className="text-foreground font-medium">{policy.faceSwapAllowed ? "Yes" : "No"}</span></div>
            </div>
          </div>
        )}

        {activeTab !== "Overview" && activeTab !== "Usage Policy" && (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <p className="text-muted-foreground">"{activeTab}" content — connect to PEALMOR API for live data</p>
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
