import ClientLayout from "@/components/layouts/ClientLayout";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Search } from "lucide-react";
import { projects } from "@/data/mockData";
import { usePlatformStore } from "@/store/platformStore";
import { useState } from "react";

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  casting: "bg-primary/10 text-primary",
  pending_approval: "bg-warning/10 text-warning",
  licensed: "bg-success/10 text-success",
  in_production: "bg-info/10 text-info",
  completed: "bg-muted text-muted-foreground",
};

export default function ClientProjects() {
  const requests = usePlatformStore((s) => s.requests);
  const [filter, setFilter] = useState("all");

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground text-sm mt-1">{projects.length} total projects</p>
          </div>
          <Button variant="hero"><Plus className="w-4 h-4" /> New Project</Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "casting", "pending_approval", "licensed", "completed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === s ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {s === "all" ? "All" : s.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-border">
                  {["Project", "Brand", "Status", "Requests", "Budget", "Period", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p) => {
                  const projRequests = requests.filter((r) => r.projectId === p.id);
                  const pendingCount = projRequests.filter((r) => r.status === "pending").length;
                  return (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-foreground">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.category}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{p.brand}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColors[p.status]}`}>
                          {p.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-foreground">{projRequests.length}</span>
                        {pendingCount > 0 && (
                          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-warning/10 text-warning font-medium">
                            {pendingCount} pending
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-sm text-foreground">${p.budget.toLocaleString()}</td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{p.campaignPeriod}</td>
                      <td className="px-5 py-4">
                        <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
