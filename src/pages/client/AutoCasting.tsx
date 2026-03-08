import ClientLayout from "@/components/layouts/ClientLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, ArrowRight, Wand2 } from "lucide-react";
import { autocast } from "@/services/pealmorApi";
import { talents } from "@/data/mockData";
import type { AutoCastingResult } from "@/types/pealmor";
import { Link } from "react-router-dom";

const roleColors: Record<string, string> = {
  lead: "bg-primary/10 text-primary border-primary/30",
  supporting: "bg-accent/10 text-accent border-accent/30",
  side: "bg-info/10 text-info border-info/30",
};

const roleLabels: Record<string, string> = {
  lead: "Lead Actor",
  supporting: "Supporting Actor",
  side: "Side Character",
};

export default function AutoCasting() {
  const [script, setScript] = useState("");
  const [results, setResults] = useState<AutoCastingResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAutocast = async () => {
    if (!script.trim()) return;
    setLoading(true);
    const res = await autocast(script);
    setResults(res);
    setLoading(false);
  };

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-primary" /> Auto Casting
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Upload your script and let the system recommend the best AI actors for each role
          </p>
        </div>

        {/* Script Input */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground">{t.client.scriptDescription}</h2>
          <textarea
            rows={6}
            placeholder="Describe your project or paste your script...&#10;&#10;Example: 'A luxury beauty brand summer campaign featuring elegant models. The campaign needs an energetic young face for TikTok content and a virtual avatar for interactive gaming elements.'"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
          <Button
            variant="hero"
            className="w-full"
            disabled={loading || !script.trim()}
            onClick={handleAutocast}
          >
            <Sparkles className="w-4 h-4" />
            {loading ? t.client.analyzingScript : t.client.autoCastButton      </Button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-foreground">Recomm{t.client.recommendedCast}            <div className="grid gap-4">
              {results.map((result, i) => {
                const talent = talents.find(t => t.id === result.recommendedActorId);
                if (!talent) return null;
                return (
                  <div key={i} className={`bg-card rounded-xl border p-6 ${roleColors[result.role] || "border-border"}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${roleColors[result.role]}`}>
                            {roleLabels[result.role]}
                          </span>
                          <span className="text-xs text-muted-foreground">Match: {result.matchScore}%</span>
                        </div>
                        <h3 className="font-display font-bold text-foreground text-lg">{result.characterName}</h3>
                        <p className="text-sm text-muted-foreground">{result.characterDescription}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-display font-bold text-primary">{result.matchScore}</div>
                        <p className="text-[10px] text-muted-foreground">Match Score</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border/50">
                      <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground text-lg">
                        {talent.initials}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{talent.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Star className="w-3 h-3 text-warning fill-warning" />
                          <span className="text-xs text-muted-foreground">{talent.rating} · {talent.nationality} · {talent.languages.join(", ")}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {result.matchReasons.map((reason, j) => (
                            <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">{reason}</span>
                          ))}
                        </div>
                      </div>
                      <Button variant="hero" size="sm" asChild>
                        <Link to={`/client/casting-request/${talent.id}`}>
                          Cast <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>

                    {/* Match score bar */}
                    <div className="mt-3">
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${result.matchScore}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
