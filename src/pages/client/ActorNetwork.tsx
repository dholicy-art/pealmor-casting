import ClientLayout from "@/components/layouts/ClientLayout";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Network, Users, Globe, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocalizedTalents } from "@/data/localizedData";
import { getActorGraph } from "@/services/pealmorApi";
import type { ActorGraphEdge } from "@/types/pealmor";
import { useI18n } from "@/i18n/I18nContext";

export default function ActorNetwork() {
  const { t, language } = useI18n();
  const talents = useMemo(() => getLocalizedTalents(language), [language]);
  const [edges, setEdges] = useState<ActorGraphEdge[]>([]);
  const [filterType, setFilterType] = useState<string>("all");

  const relationLabels: Record<string, string> = {
    co_actor: t.client.coActor,
    team_member: t.client.teamMember,
    universe_member: t.client.universe,
    agency_member: t.client.agency,
    style_similarity: t.client.similarStyle,
    frequent_collaboration: t.client.frequentCollab,
  };

  const relationColors: Record<string, string> = {
    co_actor: "bg-primary/10 text-primary",
    team_member: "bg-accent/10 text-accent",
    universe_member: "bg-info/10 text-info",
    agency_member: "bg-warning/10 text-warning",
    style_similarity: "bg-success/10 text-success",
    frequent_collaboration: "bg-primary/10 text-primary",
  };

  useEffect(() => {
    getActorGraph().then(setEdges);
  }, []);

  const filteredEdges = filterType === "all" ? edges : edges.filter(e => e.relationshipType === filterType);
  const uniqueTypes = [...new Set(edges.map(e => e.relationshipType))];

  return (
    <ClientLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
              <Network className="w-5 h-5 md:w-6 md:h-6 text-primary" /> {t.client.actorNetwork}
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm mt-1">{t.client.networkDesc}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="glass" size="sm" asChild>
              <Link to="/client/teams"><Users className="w-4 h-4 mr-1" /> {t.client.teams}</Link>
            </Button>
            <Button variant="glass" size="sm" asChild>
              <Link to="/client/universes"><Globe className="w-4 h-4 mr-1" /> {t.client.universes}</Link>
            </Button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterType === "all" ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
            {t.common.all} ({edges.length})
          </button>
          {uniqueTypes.map(tp => (
            <button key={tp} onClick={() => setFilterType(tp)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterType === tp ? "gradient-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {relationLabels[tp] || tp} ({edges.filter(e => e.relationshipType === tp).length})
            </button>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
          <h2 className="font-display font-semibold text-foreground mb-4">{t.client.actorGraph}</h2>
          <div className="grid gap-3">
            {filteredEdges.map(edge => {
              const actor = talents.find(t => t.id === edge.actorId);
              const related = talents.find(t => t.id === edge.relatedActorId);
              if (!actor || !related) return null;
              return (
                <div key={edge.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 md:p-4 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors">
                  <Link to={`/client/actor/${actor.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground text-xs md:text-sm shrink-0">{actor.initials}</div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{actor.name}</p>
                      <div className="flex items-center gap-1"><Star className="w-3 h-3 text-warning fill-warning" /><span className="text-xs text-muted-foreground">{actor.rating}</span></div>
                    </div>
                  </Link>
                  <div className="flex items-center sm:flex-col gap-2 sm:gap-1 shrink-0 w-full sm:w-auto">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${relationColors[edge.relationshipType] || "bg-muted text-muted-foreground"}`}>{relationLabels[edge.relationshipType] || edge.relationshipType}</span>
                    <div className="flex items-center gap-1"><div className="w-6 md:w-8 h-0.5 bg-border" /><span className="text-[10px] text-muted-foreground font-mono">{edge.strengthScore}</span><div className="w-6 md:w-8 h-0.5 bg-border" /></div>
                  </div>
                  <Link to={`/client/actor/${related.id}`} className="flex items-center gap-3 flex-1 min-w-0 sm:justify-end sm:text-right">
                    <div className="min-w-0 order-2 sm:order-1">
                      <p className="text-sm font-medium text-foreground truncate">{related.name}</p>
                      <div className="flex items-center gap-1 sm:justify-end"><Star className="w-3 h-3 text-warning fill-warning" /><span className="text-xs text-muted-foreground">{related.rating}</span></div>
                    </div>
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground text-xs md:text-sm shrink-0 order-1 sm:order-2">{related.initials}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-card rounded-xl border border-border p-3 md:p-4">
            <p className="text-[11px] md:text-xs text-muted-foreground">{t.client.totalActors}</p>
            <p className="text-xl md:text-2xl font-display font-bold text-foreground">{talents.length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-3 md:p-4">
            <p className="text-[11px] md:text-xs text-muted-foreground">{t.client.connections}</p>
            <p className="text-xl md:text-2xl font-display font-bold text-foreground">{edges.length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-3 md:p-4">
            <p className="text-[11px] md:text-xs text-muted-foreground">{t.client.avgStrength}</p>
            <p className="text-xl md:text-2xl font-display font-bold text-foreground">
              {edges.length > 0 ? Math.round(edges.reduce((s, e) => s + e.strengthScore, 0) / edges.length) : 0}
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-3 md:p-4">
            <p className="text-[11px] md:text-xs text-muted-foreground">{t.client.relationshipTypes}</p>
            <p className="text-xl md:text-2xl font-display font-bold text-foreground">{uniqueTypes.length}</p>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
