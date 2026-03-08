import ClientLayout from "@/components/layouts/ClientLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Filter, Star, Bookmark, ChevronDown } from "lucide-react";
import { useState } from "react";

const actors = [
  { id: "1", name: "Yuna Park", tags: ["Korean", "20s", "Elegant", "Ad-ready"], mood: "Sophisticated", voice: "Soft", rating: 4.9, price: "$800+", available: true, assets: ["Face", "Voice"], image: "YP" },
  { id: "2", name: "Alex Chen", tags: ["Chinese", "30s", "Warm", "Educational"], mood: "Friendly", voice: "Clear", rating: 4.7, price: "$600+", available: true, assets: ["Face", "Voice", "Persona"], image: "AC" },
  { id: "3", name: "Mika Tanaka", tags: ["Japanese", "20s", "Energetic", "Short-form"], mood: "Playful", voice: "Bright", rating: 4.8, price: "$700+", available: true, assets: ["Face", "Voice"], image: "MT" },
  { id: "4", name: "Seo-jin Lee", tags: ["Korean", "30s", "Professional", "Corporate"], mood: "Authoritative", voice: "Deep", rating: 4.6, price: "$900+", available: false, assets: ["Face"], image: "SL" },
  { id: "5", name: "Hana Ito", tags: ["Japanese", "20s", "Cute", "Gaming"], mood: "Cheerful", voice: "Sweet", rating: 4.9, price: "$750+", available: true, assets: ["Face", "Voice", "Avatar"], image: "HI" },
  { id: "6", name: "David Kwon", tags: ["Korean", "40s", "Trustworthy", "Finance"], mood: "Calm", voice: "Resonant", rating: 4.5, price: "$1,100+", available: true, assets: ["Face", "Voice"], image: "DK" },
];

const filters = ["All", "Ad", "Short-form", "Educational", "Gaming", "Corporate"];

export default function ClientSearch() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Find AI Actors</h1>
          <p className="text-muted-foreground text-sm mt-1">Search verified AI actors by style, mood, voice, and availability</p>
        </div>

        {/* Search */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, style, mood, language..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button variant="glass" className="gap-2">
            <Filter className="w-4 h-4" /> Filters <ChevronDown className="w-3 h-3" />
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeFilter === f
                  ? "gradient-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actors.map((a) => (
            <Link
              key={a.id}
              to={`/client/actor/${a.id}`}
              className="bg-card rounded-xl border border-border hover:border-primary/30 transition-all group overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground">
                      {a.image}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{a.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-warning fill-warning" />
                        <span className="text-xs text-muted-foreground">{a.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); }}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {a.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-muted-foreground">Mood: </span>
                    <span className="text-foreground">{a.mood}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Voice: </span>
                    <span className="text-foreground">{a.voice}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex gap-1">
                    {a.assets.map((asset) => (
                      <span key={asset} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">{asset}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${a.available ? "bg-success" : "bg-muted-foreground"}`} />
                    <span className="text-xs font-medium text-foreground">{a.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ClientLayout>
  );
}
