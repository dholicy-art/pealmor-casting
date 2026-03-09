import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Search, FileCheck, BarChart3, Users, Zap, ArrowRight, LogOut, Menu, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const stats = [
  { value: "2,400+", key: "aiActors" as const },
  { value: "850+", key: "projects" as const },
  { value: "99.2%", key: "compliance" as const },
  { value: "< 24h", key: "avgApproval" as const },
];

const featureKeys = [
  { icon: Shield, titleKey: "featureRights" as const, descKey: "featureRightsDesc" as const },
  { icon: Search, titleKey: "featureDiscovery" as const, descKey: "featureDiscoveryDesc" as const },
  { icon: FileCheck, titleKey: "featureApproval" as const, descKey: "featureApprovalDesc" as const },
  { icon: BarChart3, titleKey: "featureRevenue" as const, descKey: "featureRevenueDesc" as const },
  { icon: Users, titleKey: "featureMultiPortal" as const, descKey: "featureMultiPortalDesc" as const },
  { icon: Zap, titleKey: "featureConnected" as const, descKey: "featureConnectedDesc" as const },
];

export default function Index() {
  const { t } = useI18n();
  const { user, isAdmin, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xs md:text-sm">P</span>
            </div>
            <span className="font-display font-bold text-base md:text-lg text-foreground">PEALMOR</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">{t.landing.features}</a>
            <a href="#how" className="hover:text-foreground transition-colors">{t.landing.howItWorks}</a>
            <a href="#portals" className="hover:text-foreground transition-colors">{t.landing.portals}</a>
          </div>
          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button variant="glass" size="sm" asChild>
                  <Link to="/talent">{t.landing.talentPortal}</Link>
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/client">{t.landing.clientPortal}</Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button variant="hero" size="sm" asChild>
                <Link to="/login">로그인</Link>
              </Button>
            )}
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">{t.landing.features}</a>
            <a href="#how" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">{t.landing.howItWorks}</a>
            <a href="#portals" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">{t.landing.portals}</a>
            <div className="border-t border-border pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <Button variant="glass" size="sm" asChild className="w-full">
                    <Link to="/talent" onClick={() => setMobileMenuOpen(false)}>{t.landing.talentPortal}</Link>
                  </Button>
                  <Button variant="hero" size="sm" asChild className="w-full">
                    <Link to="/client" onClick={() => setMobileMenuOpen(false)}>{t.landing.clientPortal}</Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { signOut(); setMobileMenuOpen(false); }} className="w-full">
                    <LogOut className="w-4 h-4 mr-2" /> 로그아웃
                  </Button>
                </>
              ) : (
                <Button variant="hero" size="sm" asChild className="w-full">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>로그인</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="gradient-hero pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-40 md:w-80 h-40 md:h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-3 md:px-4 py-1.5 rounded-full border border-border text-[10px] md:text-xs font-medium text-muted-foreground mb-4 md:mb-6">
              {t.landing.poweredBy}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6">
              {t.landing.heroTitle1}{" "}
              <span className="text-gradient-primary">{t.landing.heroTitle2}</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
              {t.landing.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0">
              <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/client">{t.landing.startCasting} <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button variant="glass" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/talent">{t.landing.registerTalent}</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6 mt-12 md:mt-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            {stats.map((s) => (
              <div key={s.key} className="glass rounded-xl p-3 md:p-5 text-center">
                <p className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground">{s.value}</p>
                <p className="text-[11px] md:text-sm text-muted-foreground mt-1">{t.landing[s.key]}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              {t.landing.trustTitle1} <span className="text-gradient-accent">{t.landing.trustTitle2}</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto px-2">{t.landing.trustDesc}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featureKeys.map((f, i) => (
              <motion.div key={f.titleKey} className="gradient-card rounded-xl p-5 md:p-6 border border-border hover:border-primary/30 transition-colors group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:shadow-glow transition-shadow">
                  <f.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-base md:text-lg mb-2 text-foreground">{t.landing[f.titleKey]}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t.landing[f.descKey]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals */}
      <section id="portals" className="py-16 md:py-24 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16">{t.landing.choosePortal}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: t.landing.clientPortal, desc: t.landing.clientPortalDesc, link: user ? "/client" : "/login", variant: "hero" as const },
              { title: t.landing.talentPortal, desc: t.landing.talentPortalDesc, link: user ? "/talent" : "/login", variant: "accent" as const },
              ...(isAdmin ? [{ title: t.landing.adminPortal, desc: t.landing.adminPortalDesc, link: "/admin", variant: "glass" as const }] : []),
            ].map((p) => (
              <div key={p.title} className="gradient-card rounded-xl p-6 md:p-8 border border-border text-center flex flex-col">
                <h3 className="font-display font-semibold text-lg md:text-xl mb-2 md:mb-3 text-foreground">{p.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 flex-1">{p.desc}</p>
                <Button variant={p.variant} asChild className="w-full"><Link to={p.link}>{t.landing.enter}</Link></Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 md:py-10 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-[10px]">P</span>
            </div>
            <span className="font-display font-semibold text-sm text-foreground">PEALMOR Casting</span>
          </div>
          <p className="text-[11px] md:text-xs text-muted-foreground">{t.landing.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
