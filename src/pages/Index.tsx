import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Search, FileCheck, BarChart3, Users, Zap, ArrowRight } from "lucide-react";

const features = [
  { icon: Shield, title: "Rights-First Casting", desc: "Every AI actor comes with verified identity, consent policies, and usage rights." },
  { icon: Search, title: "Smart Discovery", desc: "Find the perfect AI actor by mood, style, voice, language, and brand fit." },
  { icon: FileCheck, title: "Approval Workflow", desc: "Structured request → review → approval → license → access key pipeline." },
  { icon: BarChart3, title: "Revenue Tracking", desc: "Transparent settlement, usage tracking, and revenue dashboards for all parties." },
  { icon: Users, title: "Multi-Portal", desc: "Dedicated experiences for clients, talents, and administrators." },
  { icon: Zap, title: "PEALMOR Connected", desc: "Direct integration with PEALMOR Core for identity, IP assets, and compliance." },
];

const stats = [
  { value: "2,400+", label: "AI Actors" },
  { value: "850+", label: "Projects" },
  { value: "99.2%", label: "Compliance" },
  { value: "< 24h", label: "Avg Approval" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">P</span>
            </div>
            <span className="font-display font-bold text-lg text-foreground">PEALMOR Casting</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#portals" className="hover:text-foreground transition-colors">Portals</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="glass" size="sm" asChild>
              <Link to="/talent">Talent Portal</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/client">Client Portal</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground mb-6">
              Powered by PEALMOR Core
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              AI Actor Casting,{" "}
              <span className="text-gradient-primary">Rights-First</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              The premium platform for casting real-person-based AI actors with verified identity, consent policies, licensing, and revenue tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/client">
                  Start Casting <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <Link to="/talent">Register as Talent</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-xl p-5 text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Built for <span className="text-gradient-accent">Trust & Control</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every feature designed around rights protection, consent management, and transparent operations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="gradient-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals CTA */}
      <section id="portals" className="py-24 px-6 border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">
            Choose Your Portal
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Client Portal", desc: "Search AI actors, create projects, send casting requests, manage licenses.", link: "/client", variant: "hero" as const },
              { title: "Talent Portal", desc: "Manage your profile, AI assets, consent policies, and earnings.", link: "/talent", variant: "accent" as const },
              { title: "Admin Portal", desc: "Verify users, review requests, handle disputes, monitor compliance.", link: "/admin", variant: "glass" as const },
            ].map((p) => (
              <div key={p.title} className="gradient-card rounded-xl p-8 border border-border text-center flex flex-col">
                <h3 className="font-display font-semibold text-xl mb-3 text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{p.desc}</p>
                <Button variant={p.variant} asChild>
                  <Link to={p.link}>Enter</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-[10px]">P</span>
            </div>
            <span className="font-display font-semibold text-sm text-foreground">PEALMOR Casting</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 PEALMOR. All rights reserved. Rights-first AI actor casting platform.</p>
        </div>
      </footer>
    </div>
  );
}
