import ClientLayout from "@/components/layouts/ClientLayout";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Globe, Star, Tag } from "lucide-react";
import { getLocalizedTalents } from "@/data/localizedData";
import { getActorUniversesApi } from "@/services/pealmorApi";
import type { ActorUniverse } from "@/types/pealmor";
import { useI18n } from "@/i18n/I18nContext";

export default function ActorUniverses() {
  const { language } = useI18n();
  const talents = useMemo(() => getLocalizedTalents(language), [language]);
  const [universes, setUniverses] = useState<ActorUniverse[]>([]);

  useEffect(() => {
    getActorUniversesApi().then(setUniverses);
  }, []);

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Globe className="w-6 h-6 text-info" /> Actor Universes
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Story-driven actor ecosystems for multi-actor productions and brand content series
          </p>
        </div>

        <div className="grid gap-6">
          {universes.map(universe => (
            <div key={universe.id} className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-colors">
              <div className="mb-4">
                <h2 className="font-display text-lg font-bold text-foreground mb-1">{universe.universeName}</h2>
                <p className="text-sm text-muted-foreground mb-3">{universe.description}</p>
                <div className="flex gap-2">
                  {universe.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-info/10 text-info font-medium">
                      <Tag className="w-2.5 h-2.5" /> {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {universe.actors.map(ua => {
                  const talent = talents.find(t => t.id === ua.actorId);
                  if (!talent) return null;
                  return (
                    <Link
                      key={ua.id}
                      to={`/client/actor/${talent.id}`}
                      className="p-4 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground text-lg mx-auto mb-2">
                        {talent.initials}
                      </div>
                      <p className="text-sm font-medium text-foreground">{talent.name}</p>
                      <p className="text-xs text-primary font-medium mt-0.5">{ua.role}</p>
                      <div className="flex items-center gap-1 justify-center mt-1">
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
