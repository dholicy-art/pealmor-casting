import ClientLayout from "@/components/layouts/ClientLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, FolderOpen, Clock, Star, FileCheck, ArrowRight } from "lucide-react";
import { talents, projects } from "@/data/mockData";
import { usePlatformStore } from "@/store/platformStore";
import { useI18n } from "@/i18n/I18nContext";

export default function ClientDashboard() {
  const { t } = useI18n();
  const requests = usePlatformStore((s) => s.requests);
  const pendingRequests = requests.filter((r) => r.status === "pending");
  const bookmarked = usePlatformStore((s) => s.bookmarkedTalents);
  const recentTalents = talents.slice(0, 4);
  const activeProjects = projects.filter((p) => p.status !== "completed");

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{t.client.welcomeBack}</h1>
            <p className="text-muted-foreground text-sm mt-1">{t.client.manageProjects}</p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/client/search"><Search className="w-4 h-4" /> {t.client.findAIActors}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: FolderOpen, label: t.client.activeProjects, value: String(activeProjects.length), color: "text-primary" },
            { icon: Clock, label: t.client.pendingApprovals, value: String(pendingRequests.length), color: "text-warning" },
            { icon: Star, label: t.client.bookmarked, value: String(bookmarked.length), color: "text-accent" },
            { icon: FileCheck, label: t.client.activeLicenses, value: "1", color: "text-success" },
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

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">{t.client.activeProjects}</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/client/projects">{t.common.viewAll} <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {activeProjects.slice(0, 4).map((p) => {
              const projectRequests = requests.filter((r) => r.projectId === p.id);
              const statusColors: Record<string, string> = { casting: "bg-primary/10 text-primary", pending_approval: "bg-warning/10 text-warning", licensed: "bg-success/10 text-success", draft: "bg-muted text-muted-foreground" };
              return (
                <Link key={p.id} to="/client/projects" className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{p.title}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[p.status] || "bg-muted text-muted-foreground"}`}>{p.status.replace("_", " ")}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{p.brand}</span><span>•</span><span>{projectRequests.length} {t.client.requests.toLowerCase()}</span><span>•</span><span>${p.budget.toLocaleString()}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">{t.client.recentlyViewed}</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/client/search">{t.client.browseAll} <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {recentTalents.map((a) => (
              <Link key={a.id} to={`/client/actor/${a.id}`} className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors group">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground mb-3 text-lg">{a.initials}</div>
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{a.name}</h3>
                <div className="flex items-center gap-1 mt-1 mb-2">
                  <Star className="w-3 h-3 text-warning fill-warning" />
                  <span className="text-xs text-muted-foreground">{a.rating}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {a.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{tag}</span>
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
