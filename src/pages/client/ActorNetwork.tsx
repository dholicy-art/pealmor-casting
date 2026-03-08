import ClientLayout from "@/components/layouts/ClientLayout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Network, Users, Globe, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { talents } from "@/data/mockData";
import { getActorGraph } from "@/services/pealmorApi";
import type { ActorGraphEdge } from "@/types/pealmor";

const relationLabels: Record<string, string> = {
  co_actor: "Co-Actor",
  team_member: "Team Member",
  universe_member: "Universe",
  agency_member: "Agency",
  style_similarity: "Similar Style",
  frequent_collaboration: "Frequent Collab",
};

const relationColors: Record<string, string> = {
  co_actor: "bg-primary/10 text-primary",
  team_member: "bg-accent/10 text-accent",
  universe_member: "bg-info/10 text-info",
  agency_member: "bg-warning/10 text-warning",
  style_similarity: "bg-success/10 text-success",
  frequent_collaboration: "bg-primary/10 text-primary",
};

export default function ActorNetwork() {
  const [edges, setEdges] = useState<ActorGraphEdge[]>([]);
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    getActorGraph().then(setEdges);
  }, []);

  const filteredEdges = filterType === "all" ? edges : edges.filter(e => e.relationshipType === filterType);

  const uniqueTypes = [...new Set(edges.map(e => e.relationshipType))];

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <Network className="w-6 h-6 text-primary" /> Actor Network
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Explore relationships between AI actors — co-actors, teams, and universes
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="glass" size="sm" asChild>
              <Link to="/client/teams"><Users className="w-4 h-4 mr-1" /> Teams</Link>
            </Button>
            <Button variant="glass" size="sm" asChild>
              <Link to="/client/universes"><Globe className="w-4 h-4 mr-1" /> Universes</Link>
            </Button>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterType === "all" ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            All ({edges.length})
          </button>
          {uniqueTypes.map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterType === t ? "gradient-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {relationLabels[t] || t} ({edges.filter(e => e.relationshipType === t).length})
            </button>
          ))}
        </div>

        {/* Network Graph (Visual representation) */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display font-semibold text-foreground mb-4">Actor Graph</h2>
          <div className="grid gap-3">
            {filteredEdges.map(edge => {
              const actor = talents.find(t => t.id === edge.actorId);
              const related = talents.find(t => t.id === edge.relatedActorId);
              if (!actor || !related) return null;
              return (
                <div key={edge.id} className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors">
                  {/* Actor A */}
                  <Link to={`/client/actor/${actor.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground text-sm shrink-0">
                      {actor.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{actor.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-warning fill-warning" />
                        <span className="text-xs text-muted-foreground">{actor.rating}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Relationship */}
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${relationColors[edge.relationshipType] || "bg-muted text-muted-foreground"}`}>
                      {relationLabels[edge.relationshipType] || edge.relationshipType}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-0.5 bg-border" />
                      <span className="text-[10px] text-muted-foreground font-mono">{edge.strengthScore}</span>
                      <div className="w-8 h-0.5 bg-border" />
                    </div>
                  </div>

                  {/* Actor B */}
                  <Link to={`/client/actor/${related.id}`} className="flex items-center gap-3 flex-1 min-w-0 justify-end text-right">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{related.name}</p>
                      <div className="flex items-center gap-1 justify-end">
                        <Star className="w-3 h-3 text-warning fill-warning" />
                        <span className="text-xs text-muted-foreground">{related.rating}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground text-sm shrink-0">
                      {related.initials}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground">Total Actors</p>
            <p className="text-2xl font-display font-bold text-foreground">{talents.length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground">Connections</p>
            <p className="text-2xl font-display font-bold text-foreground">{edges.length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground">Avg Strength</p>
            <p className="text-2xl font-display font-bold text-foreground">
              {edges.length > 0 ? Math.round(edges.reduce((s, e) => s + e.strengthScore, 0) / edges.length) : 0}
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground">Relationship Types</p>
            <p className="text-2xl font-display font-bold text-foreground">{uniqueTypes.length}</p>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
