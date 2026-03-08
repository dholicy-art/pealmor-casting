import ClientLayout from "@/components/layouts/ClientLayout";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocalizedTalents } from "@/data/localizedData";
import { getActorTeamsApi } from "@/services/pealmorApi";
import type { ActorTeam } from "@/types/pealmor";
import { useI18n } from "@/i18n/I18nContext";

const teamTypeLabels: Record<string, string> = {
  kpop_group: "Idol Group",
  drama_cast: "Drama Cast",
  brand_ambassadors: "Brand Ambassadors",
  custom: "Custom Team",
};

const teamTypeColors: Record<string, string> = {
  kpop_group: "bg-accent/10 text-accent",
  drama_cast: "bg-info/10 text-info",
  brand_ambassadors: "bg-primary/10 text-primary",
  custom: "bg-warning/10 text-warning",
};

export default function ActorTeams() {
  const { language } = useI18n();
  const talents = useMemo(() => getLocalizedTalents(language), [language]);
  const [teams, setTeams] = useState<ActorTeam[]>([]);

  useEffect(() => {
    getActorTeamsApi().then(setTeams);
  }, []);

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-accent" /> Actor Teams
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Pre-formed AI actor groups for team casting and multi-actor projects
          </p>
        </div>

        <div className="grid gap-6">
          {teams.map(team => (
            <div key={team.id} className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="font-display text-lg font-bold text-foreground">{team.teamName}</h2>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${teamTypeColors[team.teamType] || "bg-muted text-muted-foreground"}`}>
                      {teamTypeLabels[team.teamType] || team.teamType}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{team.description}</p>
                </div>
                <Button variant="hero" size="sm">
                  Cast Team <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {team.members.map(member => {
                  const talent = talents.find(t => t.id === member.actorId);
                  if (!talent) return null;
                  return (
                    <Link
                      key={member.id}
                      to={`/client/actor/${talent.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground text-sm">
                        {talent.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{talent.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-3 h-3 text-warning fill-warning" />
                        <span className="text-xs text-muted-foreground">{talent.rating}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ClientLayout>
  );
}
