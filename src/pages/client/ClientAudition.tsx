import ClientLayout from "@/components/layouts/ClientLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Eye, Sparkles, Play, Pause, Star, ArrowRight, Upload } from "lucide-react";
import { talents } from "@/data/mockData";
import { generateAuditionPerformances } from "@/services/pealmorApi";
import type { AIAuditionPerformance } from "@/types/pealmor";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nContext";

const emotionOptions = ["Neutral", "Warm", "Excited", "Serious", "Playful", "Dramatic"];
const typeOptionsBase: { value: "voice" | "face" | "full"; labelKey: "voicePerformance" | "faceActing" | "fullPerformance"; icon: typeof Mic }[] = [
  { value: "voice", labelKey: "voicePerformance", icon: Mic },
  { value: "face", labelKey: "faceActing", icon: Eye },
  { value: "full", labelKey: "fullPerformance", icon: Sparkles },
];

export default function ClientAudition() {
  const { t } = useI18n();
  const [script, setScript] = useState("");
  const [selectedType, setSelectedType] = useState<"voice" | "face" | "full">("voice");
  const [selectedTones, setSelectedTones] = useState<string[]>(["Neutral", "Warm"]);
  const [selectedTalents, setSelectedTalents] = useState<string[]>(["t1", "t3", "t5"]);
  const [performances, setPerformances] = useState<AIAuditionPerformance[]>([]);
  const [generating, setGenerating] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);

  const toggleTone = (tone: string) => {
    setSelectedTones((prev) =>
      prev.includes(tone) ? prev.filter((t) => t !== tone) : [...prev, tone]
    );
  };

  const toggleTalent = (id: string) => {
    setSelectedTalents((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const handleGenerate = async () => {
    if (!script.trim() || selectedTalents.length === 0 || selectedTones.length === 0) return;
    setGenerating(true);
    const results = await generateAuditionPerformances(selectedTalents, script, selectedType, selectedTones);
    setPerformances(results);
    setGenerating(false);
  };

  const availableTalents = talents.filter((t) => t.available);

  // Group performances by talent
  const groupedByTalent = performances.reduce<Record<string, AIAuditionPerformance[]>>((acc, p) => {
    if (!acc[p.talentId]) acc[p.talentId] = [];
    acc[p.talentId].push(p);
    return acc;
  }, {});

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t.client.aiAudition}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t.client.generateAudition}
          </p>
        </div>

        {/* Script Input */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold text-foreground">{t.client.script}</h2>
          </div>
          <textarea
            rows={5}
            placeholder="Enter your script or dialogue here... e.g., 'Welcome to LuxeBeauty's new summer collection. Experience the elegance of nature-inspired beauty.'"
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        {/* Performance Type */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground">{t.client.performanceType}</h2>
          <div className="flex gap-3">
            {typeOptionsBase.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedType(opt.value)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex-1 ${
                  selectedType === opt.value
                    ? "gradient-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <opt.icon className="w-4 h-4" />
                {t.client[opt.labelKey]}
              </button>
            ))}
          </div>
        </div>

        {/* Emotion Tones */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground">{t.client.emotionTones}</h2>
          <div className="flex flex-wrap gap-2">
            {emotionOptions.map((tone) => (
              <button
                key={tone}
                onClick={() => toggleTone(tone)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  selectedTones.includes(tone)
                    ? "gradient-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* Select Actors */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground">{t.client.selectActors}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {availableTalents.map((talent) => (
              <button
                key={talent.id}
                onClick={() => toggleTalent(talent.id)}
                className={`p-4 rounded-lg border text-start transition-all ${
                  selectedTalents.includes(talent.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground text-sm">
                    {talent.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{talent.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-warning fill-warning" />
                      <span className="text-xs text-muted-foreground">{talent.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  {talent.assets.map((a) => (
                    <span key={a.id} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium capitalize">{a.type}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button
          variant="hero"
          className="w-full"
          disabled={generating || !script.trim() || selectedTalents.length === 0 || selectedTones.length === 0}
          onClick={handleGenerate}
        >
          <Sparkles className="w-4 h-4" />
          {generating ? t.client.generatingPerformances : t.client.generateAudition}
        </Button>

        {/* Results */}
        {performances.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold text-foreground">{t.client.auditionResults}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
                {performances.length} {t.client.performances}
              </span>
            </div>

            {Object.entries(groupedByTalent).map(([talentId, perfs]) => {
              const talent = talents.find((t) => t.id === talentId);
              const bestScore = Math.max(...perfs.map((p) => p.score));
              return (
                <div key={talentId} className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground">
                        {talent?.initials || "?"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{perfs[0].talentName}</h3>
                        <p className="text-xs text-muted-foreground">Best score: {bestScore}/100</p>
                      </div>
                    </div>
                    <Button variant="hero" size="sm" asChild>
                      <Link to={`/client/casting-request/${talentId}`}>
                        Cast <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {perfs.map((perf) => (
                      <div key={perf.id} className="bg-background rounded-lg p-4 border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                              {perf.emotionTone}
                            </span>
                            <span className="text-xs text-muted-foreground capitalize">{perf.type}</span>
                          </div>
                          <span className={`text-sm font-bold ${perf.score >= 85 ? "text-success" : perf.score >= 70 ? "text-warning" : "text-muted-foreground"}`}>
                            {perf.score}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setPlaying(playing === perf.id ? null : perf.id)}
                            className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                          >
                            {playing === perf.id ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          </button>
                          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full gradient-primary rounded-full" style={{ width: `${perf.score}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{perf.duration}s</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
