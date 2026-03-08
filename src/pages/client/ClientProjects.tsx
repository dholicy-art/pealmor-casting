import ClientLayout from "@/components/layouts/ClientLayout";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";

const projects = [
  { id: "p1", title: "Summer Campaign 2026", brand: "LuxeBeauty", status: "Casting", actors: 3, budget: "$12,000", created: "Mar 1, 2026" },
  { id: "p2", title: "Brand Ambassador Video", brand: "TechFlow", status: "Pending Approval", actors: 1, budget: "$5,500", created: "Feb 28, 2026" },
  { id: "p3", title: "Product Launch Intro", brand: "NovaSkin", status: "Licensed", actors: 2, budget: "$8,200", created: "Feb 20, 2026" },
  { id: "p4", title: "Holiday Short-form Series", brand: "LuxeBeauty", status: "Completed", actors: 4, budget: "$15,000", created: "Jan 10, 2026" },
];

const statusColors: Record<string, string> = {
  Casting: "bg-primary/10 text-primary",
  "Pending Approval": "bg-warning/10 text-warning",
  Licensed: "bg-success/10 text-success",
  Completed: "bg-muted text-muted-foreground",
};

export default function ClientProjects() {
  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your casting projects</p>
          </div>
          <Button variant="hero"><Plus className="w-4 h-4" /> New Project</Button>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Project", "Brand", "Status", "Actors", "Budget", "Created", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-foreground">{p.title}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{p.brand}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{p.actors}</td>
                  <td className="px-5 py-4 text-sm text-foreground">{p.budget}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{p.created}</td>
                  <td className="px-5 py-4">
                    <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ClientLayout>
  );
}
