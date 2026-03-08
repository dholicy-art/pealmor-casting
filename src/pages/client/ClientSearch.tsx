import ClientLayout from "@/components/layouts/ClientLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Filter, Star, Bookmark, BookmarkCheck, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { talents } from "@/data/mockData";
import { usePlatformStore } from "@/store/platformStore";

const filterCategories = ["All", "Ad", "Short-form", "Educational", "Gaming", "Corporate", "Entertainment"];

export default function ClientSearch() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const { bookmarkedTalents, toggleBookmark } = usePlatformStore();

  const filtered = useMemo(() => {
    let result = talents;
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        t.moodTags.some((m) => m.toLowerCase().includes(q)) ||
        t.voiceTags.some((v) => v.toLowerCase().includes(q)) ||
        t.intro.toLowerCase().includes(q)
      );
    }
    if (activeFilter !== "All") {
      result = result.filter((t) =>
        t.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase())) ||
        t.consentPolicy.allowedPurposes.some((p) => p.toLowerCase().includes(activeFilter.toLowerCase()))
      );
    }
    if (genderFilter) result = result.filter((t) => t.genderExpression === genderFilter);
    if (regionFilter) result = result.filter((t) => t.consentPolicy.allowedRegions.some((r) => r.includes(regionFilter!)));
    return result;
  }, [query, activeFilter, genderFilter, regionFilter]);

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Find AI Actors</h1>
          <p className="text-muted-foreground text-sm mt-1">Search {talents.length} verified AI actors</p>
        </div>

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
          <Button variant="glass" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4" /> Filters <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {showFilters && (
          <div className="bg-card rounded-xl border border-border p-4 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Gender</p>
              <div className="flex gap-2">
                {[null, "Female", "Male"].map((g) => (
                  <button
                    key={g ?? "all"}
                    onClick={() => setGenderFilter(g)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      genderFilter === g ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {g ?? "All"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Region Availability</p>
              <div className="flex gap-2 flex-wrap">
                {[null, "Korea", "Japan", "Global", "Southeast Asia"].map((r) => (
                  <button
                    key={r ?? "all"}
                    onClick={() => setRegionFilter(r)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      regionFilter === r ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {r ?? "All"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          {filterCategories.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeFilter === f ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">{filtered.length} actors found</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((a) => {
            const isBookmarked = bookmarkedTalents.includes(a.id);
            return (
              <div key={a.id} className="bg-card rounded-xl border border-border hover:border-primary/30 transition-all group overflow-hidden">
                <Link to={`/client/actor/${a.id}`} className="block p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground">
                        {a.initials}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{a.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-warning fill-warning" />
                          <span className="text-xs text-muted-foreground">{a.rating} ({a.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{a.intro}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {a.tags.slice(0, 4).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div><span className="text-muted-foreground">Mood: </span><span className="text-foreground">{a.moodTags[0]}</span></div>
                    <div><span className="text-muted-foreground">Voice: </span><span className="text-foreground">{a.voiceTags[0]}</span></div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex gap-1">
                      {a.assets.map((asset) => (
                        <span key={asset.id} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium capitalize">{asset.type}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${a.available ? "bg-success" : "bg-muted-foreground"}`} />
                      <span className="text-xs font-medium text-foreground">${a.startingPrice}+</span>
                    </div>
                  </div>
                </Link>
                <div className="px-5 pb-4 flex gap-2">
                  <Button variant="hero" size="sm" className="flex-1" asChild>
                    <Link to={`/client/casting-request/${a.id}`}>Cast</Link>
                  </Button>
                  <Button
                    variant="glass"
                    size="icon"
                    className="shrink-0"
                    onClick={() => toggleBookmark(a.id)}
                  >
                    {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-accent" /> : <Bookmark className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No actors match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
}
