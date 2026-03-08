import ClientLayout from "@/components/layouts/ClientLayout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Star, Bookmark, BookmarkCheck, Share2, Shield, CheckCircle, XCircle, Clock, ArrowLeft, Network, Users, Globe } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { getActorRelations, getActorTeams, getActorUniverses } from "@/data/mockData";
import { getLocalizedTalents, getLocalizedTalentById } from "@/data/localizedData";
import { usePlatformStore } from "@/store/platformStore";
import { toast } from "sonner";
import type { ActorGraphEdge, ActorTeam, ActorUniverse } from "@/types/pealmor";
import { useI18n } from "@/i18n/I18nContext";

const tabs = ["Overview", "Network", "Samples", "Voice", "Persona", "Usage Policy", "Reviews"];

const relationLabels: Record<string, string> = {
  co_actor: "Co-Actor",
  team_member: "Team Member",
  universe_member: "Universe",
  agency_member: "Agency",
  style_similarity: "Similar Style",
  frequent_collaboration: "Frequent Collab",
};

export default function ClientActorDetail() {
  const { id } = useParams();
  const { language } = useI18n();
  const talents = useMemo(() => getLocalizedTalents(language), [language]);
  const [activeTab, setActiveTab] = useState("Overview");
  const talent = getLocalizedTalentById(id || "", language);
  const { bookmarkedTalents, toggleBookmark, addToCompare, compareTalents } = usePlatformStore();

  const [relations, setRelations] = useState<ActorGraphEdge[]>([]);
  const [teams, setTeams] = useState<ActorTeam[]>([]);
  const [universes, setUniverses] = useState<ActorUniverse[]>([]);

  useEffect(() => {
    if (id) {
      setRelations(getActorRelations(id));
      setTeams(getActorTeams(id));
      setUniverses(getActorUniverses(id));
    }
  }, [id]);

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
    if (isInCompare) { toast.info("Already in compare list"); return; }
    if (compareTalents.length >= 4) { toast.error("Max 4 actors can be compared"); return; }
    addToCompare(talent.id);
    toast.success(`${talent.name} added to compare`);
  };

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/client/search"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Search</Link>
        </Button>

        {/* Header */}
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
                  <div className="flex items-center gap-4 text-sm flex-wrap">
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
                    {teams.length > 0 && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="flex items-center gap-1 text-accent text-xs">
                          <Users className="w-3 h-3" /> {teams.length} team{teams.length > 1 ? "s" : ""}
                        </span>
                      </>
                    )}
                    {universes.length > 0 && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="flex items-center gap-1 text-info text-xs">
                          <Globe className="w-3 h-3" /> {universes.length} universe{universes.length > 1 ? "s" : ""}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="glass" size="icon" onClick={() => { toggleBookmark(talent.id); toast.success(isBookmarked ? "Bookmark removed" : "Bookmark added"); }}>
                    {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-accent" /> : <Bookmark className="w-4 h-4" />}
                  </Button>
                  <Button variant="glass" size="icon" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied"); }}>
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

        {/* Tabs */}
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
              {tab === "Network" && relations.length > 0 && (
                <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full gradient-primary text-primary-foreground font-bold">
                  {relations.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
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

              {/* Teams & Universes preview */}
              {(teams.length > 0 || universes.length > 0) && (
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-display font-semibold mb-4 text-foreground">Teams & Universes</h3>
                  {teams.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 uppercase font-medium">Teams</p>
                      <div className="flex flex-wrap gap-2">
                        {teams.map(t => (
                          <Link key={t.id} to="/client/teams" className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium hover:bg-accent/20 transition-colors">
                            <Users className="w-3 h-3 inline mr-1" />{t.teamName}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {universes.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2 uppercase font-medium">Universes</p>
                      <div className="flex flex-wrap gap-2">
                        {universes.map(u => (
                          <Link key={u.id} to="/client/universes" className="text-xs px-3 py-1.5 rounded-full bg-info/10 text-info font-medium hover:bg-info/20 transition-colors">
                            <Globe className="w-3 h-3 inline mr-1" />{u.universeName}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
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

        {/* Network Tab */}
        {activeTab === "Network" && (
          <div className="space-y-6">
            {/* Related Actors */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-display font-semibold mb-4 text-foreground flex items-center gap-2">
                <Network className="w-4 h-4 text-primary" /> Connections ({relations.length})
              </h3>
              {relations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No connections found.</p>
              ) : (
                <div className="grid gap-3">
                  {relations.map(edge => {
                    const relatedId = edge.actorId === talent.id ? edge.relatedActorId : edge.actorId;
                    const related = talents.find(t => t.id === relatedId);
                    if (!related) return null;
                    return (
                      <Link key={edge.id} to={`/client/actor/${related.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground text-sm">
                          {related.initials}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{related.name}</p>
                          <p className="text-xs text-muted-foreground">{relationLabels[edge.relationshipType]} · Strength {edge.strengthScore}</p>
                        </div>
                        <Star className="w-3 h-3 text-warning fill-warning" />
                        <span className="text-xs text-muted-foreground">{related.rating}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Teams */}
            {teams.length > 0 && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold mb-4 text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" /> Teams
                </h3>
                {teams.map(team => (
                  <div key={team.id} className="p-4 rounded-lg bg-background border border-border/50 mb-3 last:mb-0">
                    <p className="font-semibold text-foreground">{team.teamName}</p>
                    <p className="text-xs text-muted-foreground mb-2">{team.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {team.members.map(m => {
                        const t = talents.find(x => x.id === m.actorId);
                        return t ? (
                          <Link key={m.id} to={`/client/actor/${t.id}`} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            {t.name} ({m.role})
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Universes */}
            {universes.length > 0 && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold mb-4 text-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4 text-info" /> Universes
                </h3>
                {universes.map(uni => (
                  <div key={uni.id} className="p-4 rounded-lg bg-background border border-border/50 mb-3 last:mb-0">
                    <p className="font-semibold text-foreground">{uni.universeName}</p>
                    <p className="text-xs text-muted-foreground mb-2">{uni.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {uni.actors.map(a => {
                        const t = talents.find(x => x.id === a.actorId);
                        return t ? (
                          <Link key={a.id} to={`/client/actor/${t.id}`} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            {t.name} ({a.role})
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Usage Policy Tab */}
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

        {activeTab !== "Overview" && activeTab !== "Usage Policy" && activeTab !== "Network" && (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <p className="text-muted-foreground">"{activeTab}" content — connect to PEALMOR API for live data</p>
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
