import ClientLayout from "@/components/layouts/ClientLayout";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, XCircle, Clock } from "lucide-react";

const compareActors = [
  { name: "Yuna Park", image: "YP", rating: 4.9, mood: "Sophisticated", voice: "Soft", price: "$800+", approval: "12h", languages: "KR, EN", regions: "KR, JP, SEA", assets: ["Face", "Voice", "Persona"], maxTerm: "90 days", political: false, adult: false, derivative: "conditional" },
  { name: "Mika Tanaka", image: "MT", rating: 4.8, mood: "Playful", voice: "Bright", price: "$700+", approval: "8h", languages: "JP, EN", regions: "JP, Global", assets: ["Face", "Voice"], maxTerm: "60 days", political: false, adult: false, derivative: "yes" },
  { name: "Hana Ito", image: "HI", rating: 4.9, mood: "Cheerful", voice: "Sweet", price: "$750+", approval: "6h", languages: "JP", regions: "JP, KR", assets: ["Face", "Voice", "Avatar"], maxTerm: "120 days", political: false, adult: false, derivative: "no" },
];

const rows = [
  { label: "Rating", key: "rating" },
  { label: "Mood", key: "mood" },
  { label: "Voice", key: "voice" },
  { label: "Starting Price", key: "price" },
  { label: "Avg. Approval", key: "approval" },
  { label: "Languages", key: "languages" },
  { label: "Regions", key: "regions" },
  { label: "Max Term", key: "maxTerm" },
] as const;

export default function ClientCompare() {
  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Compare AI Actors</h1>
          <p className="text-muted-foreground text-sm mt-1">Side-by-side comparison of selected actors</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr>
                <th className="w-40 p-4 text-left text-xs text-muted-foreground font-medium" />
                {compareActors.map((a) => (
                  <th key={a.name} className="p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-xl text-secondary-foreground">
                        {a.image}
                      </div>
                      <span className="font-display font-semibold text-foreground">{a.name}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-warning fill-warning" />
                        <span className="text-xs text-muted-foreground">{a.rating}</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-t border-border">
                  <td className="p-4 text-sm text-muted-foreground font-medium">{row.label}</td>
                  {compareActors.map((a) => (
                    <td key={a.name} className="p-4 text-center text-sm text-foreground">
                      {String(a[row.key])}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-border">
                <td className="p-4 text-sm text-muted-foreground font-medium">Assets</td>
                {compareActors.map((a) => (
                  <td key={a.name} className="p-4 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {a.assets.map((asset) => (
                        <span key={asset} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">{asset}</span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="p-4 text-sm text-muted-foreground font-medium">Political Use</td>
                {compareActors.map((a) => (
                  <td key={a.name} className="p-4 text-center"><XCircle className="w-4 h-4 text-destructive mx-auto" /></td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="p-4 text-sm text-muted-foreground font-medium">Derivative Works</td>
                {compareActors.map((a) => (
                  <td key={a.name} className="p-4 text-center">
                    {a.derivative === "yes" && <CheckCircle className="w-4 h-4 text-success mx-auto" />}
                    {a.derivative === "no" && <XCircle className="w-4 h-4 text-destructive mx-auto" />}
                    {a.derivative === "conditional" && <Clock className="w-4 h-4 text-warning mx-auto" />}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="p-4" />
                {compareActors.map((a) => (
                  <td key={a.name} className="p-4 text-center">
                    <Button variant="hero" size="sm">Request Casting</Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ClientLayout>
  );
}
