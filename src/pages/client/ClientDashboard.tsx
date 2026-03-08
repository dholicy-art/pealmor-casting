import ClientLayout from "@/components/layouts/ClientLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, FolderOpen, Clock, AlertTriangle, ArrowRight, Star } from "lucide-react";

const recentActors = [
  { id: "1", name: "Yuna Park", tags: ["Korean", "20s", "Elegant"], image: "YP", rating: 4.9 },
  { id: "2", name: "Alex Chen", tags: ["Chinese", "30s", "Warm"], image: "AC", rating: 4.7 },
  { id: "3", name: "Mika Tanaka", tags: ["Japanese", "20s", "Energetic"], image: "MT", rating: 4.8 },
  { id: "4", name: "Seo-jin Lee", tags: ["Korean", "30s", "Professional"], image: "SL", rating: 4.6 },
];

const activeProjects = [
  { id: "p1", title: "Summer Campaign 2026", status: "Casting", actors: 3, budget: "$12,000" },
  { id: "p2", title: "Brand Ambassador Video", status: "Pending Approval", actors: 1, budget: "$5,500" },
];

export default function ClientDashboard() {
  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, Jun</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your AI casting projects</p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/client/search">
              <Search className="w-4 h-4" /> Find AI Actors
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: FolderOpen, label: "Active Projects", value: "4", color: "text-primary" },
            { icon: Clock, label: "Pending Approvals", value: "2", color: "text-warning" },
            { icon: Star, label: "Bookmarked", value: "12", color: "text-accent" },
            { icon: AlertTriangle, label: "Expiring Licenses", value: "1", color: "text-destructive" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-5 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Active Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Active Projects</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/client/projects">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {activeProjects.map((p) => (
              <div key={p.id} className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{p.title}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    p.status === "Casting" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"
                  }`}>
                    {p.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{p.actors} actors</span>
                  <span>•</span>
                  <span>{p.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Actors */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Recently Viewed</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/client/search">Browse All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {recentActors.map((a) => (
              <Link
                key={a.id}
                to={`/client/actor/${a.id}`}
                className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground mb-3 text-lg">
                  {a.image}
                </div>
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{a.name}</h3>
                <div className="flex items-center gap-1 mt-1 mb-2">
                  <Star className="w-3 h-3 text-warning fill-warning" />
                  <span className="text-xs text-muted-foreground">{a.rating}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {a.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
