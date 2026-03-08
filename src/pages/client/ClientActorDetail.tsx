import ClientLayout from "@/components/layouts/ClientLayout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Star, Bookmark, Share2, Shield, CheckCircle, XCircle, Clock, ArrowLeft } from "lucide-react";
import { useState } from "react";

const tabs = ["Overview", "Samples", "Voice", "Persona", "Usage Policy", "Reviews"];

const policyItems = [
  { label: "Ads / Commercials", allowed: true },
  { label: "Short-form Content", allowed: true },
  { label: "Educational", allowed: true },
  { label: "Character Chatbot", allowed: true },
  { label: "Political", allowed: false },
  { label: "Adult / Violence", allowed: false },
  { label: "Religious Sensitive", allowed: false },
  { label: "Derivative Works", allowed: "conditional" as const },
];

export default function ClientActorDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/client/search"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Search</Link>
        </Button>

        {/* Header */}
        <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-28 h-28 rounded-2xl bg-secondary flex items-center justify-center font-display font-bold text-3xl text-secondary-foreground shrink-0">
              YP
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="font-display text-2xl font-bold text-foreground">Yuna Park</h1>
                    <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-success/10 text-success font-medium">
                      <Shield className="w-3 h-3" /> Verified
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">Sophisticated, elegant AI actor — ideal for luxury brand campaigns and premium content.</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="font-semibold text-foreground">4.9</span>
                      <span className="text-muted-foreground">(47 projects)</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" /> Avg. 12h approval
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="glass" size="icon"><Bookmark className="w-4 h-4" /></Button>
                  <Button variant="glass" size="icon"><Share2 className="w-4 h-4" /></Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Korean", "20s", "Elegant", "Luxury", "Ad-ready", "English OK"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
            <Button variant="hero" className="flex-1 sm:flex-none">
              Request Casting
            </Button>
            <Button variant="glass" asChild>
              <Link to="/client/compare">Add to Compare</Link>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Overview" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold mb-4 text-foreground">About</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Yuna Park is a verified AI actor on PEALMOR, specializing in luxury brand representation and premium content creation. Her AI persona captures an elegant, sophisticated tone ideal for high-end advertising, beauty campaigns, and premium lifestyle content. Available in Korean and English with natural-sounding voice synthesis.
                </p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold mb-4 text-foreground">Available Assets</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: "Face Image Set", status: "Ready", quality: "A+" },
                    { type: "Voice Clone", status: "Ready", quality: "A" },
                    { type: "Persona Model", status: "Ready", quality: "A+" },
                    { type: "Avatar (Virtual)", status: "Coming Soon", quality: "—" },
                  ].map((asset) => (
                    <div key={asset.type} className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <p className="text-sm font-medium text-foreground">{asset.type}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${asset.status === "Ready" ? "text-success" : "text-muted-foreground"}`}>{asset.status}</span>
                        <span className="text-xs text-muted-foreground">Quality: {asset.quality}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold mb-4 text-foreground">Usage Policy</h3>
                <div className="space-y-2">
                  {policyItems.map((p) => (
                    <div key={p.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{p.label}</span>
                      {p.allowed === true && <CheckCircle className="w-4 h-4 text-success" />}
                      {p.allowed === false && <XCircle className="w-4 h-4 text-destructive" />}
                      {p.allowed === "conditional" && <Clock className="w-4 h-4 text-warning" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold mb-3 text-foreground">Pricing</h3>
                <p className="text-2xl font-display font-bold text-foreground">$800+</p>
                <p className="text-xs text-muted-foreground mt-1">Starting price per project</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Max Term</span><span className="text-foreground">90 days</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Regions</span><span className="text-foreground">KR, JP, SEA</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Exclusivity</span><span className="text-foreground">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab !== "Overview" && (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <p className="text-muted-foreground">Content for "{activeTab}" tab</p>
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
