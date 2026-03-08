import { useState } from "react";
import { HelpCircle, Search, Network, Users, Globe, Sparkles, Wand2, FolderOpen, BarChart3, Bookmark, Settings, ChevronDown, ChevronUp, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

interface GuideSection {
  icon: React.ElementType;
  titleKey: keyof typeof helpKeys;
  descKey: keyof typeof helpKeys;
}

const helpKeys = {
  helpClientTitle: true, helpClientDesc: true,
  helpSearchTitle: true, helpSearchDesc: true,
  helpNetworkTitle: true, helpNetworkDesc: true,
  helpTeamsTitle: true, helpTeamsDesc: true,
  helpUniversesTitle: true, helpUniversesDesc: true,
  helpAuditionTitle: true, helpAuditionDesc: true,
  helpAutoCastTitle: true, helpAutoCastDesc: true,
  helpProjectsTitle: true, helpProjectsDesc: true,
  helpCompareTitle: true, helpCompareDesc: true,
  helpLicensesTitle: true, helpLicensesDesc: true,
  helpSettingsTitle: true, helpSettingsDesc: true,
  helpTalentTitle: true, helpTalentDesc: true,
  helpAdminTitle: true, helpAdminDesc: true,
};

const sections: GuideSection[] = [
  { icon: Search, titleKey: "helpSearchTitle", descKey: "helpSearchDesc" },
  { icon: Network, titleKey: "helpNetworkTitle", descKey: "helpNetworkDesc" },
  { icon: Users, titleKey: "helpTeamsTitle", descKey: "helpTeamsDesc" },
  { icon: Globe, titleKey: "helpUniversesTitle", descKey: "helpUniversesDesc" },
  { icon: Sparkles, titleKey: "helpAuditionTitle", descKey: "helpAuditionDesc" },
  { icon: Wand2, titleKey: "helpAutoCastTitle", descKey: "helpAutoCastDesc" },
  { icon: FolderOpen, titleKey: "helpProjectsTitle", descKey: "helpProjectsDesc" },
  { icon: Bookmark, titleKey: "helpCompareTitle", descKey: "helpCompareDesc" },
  { icon: BarChart3, titleKey: "helpLicensesTitle", descKey: "helpLicensesDesc" },
  { icon: Settings, titleKey: "helpSettingsTitle", descKey: "helpSettingsDesc" },
];

export default function HelpGuide() {
  const [open, setOpen] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const { t } = useI18n();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-8 h-8 rounded-full border border-border bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        title={t.common.help}
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg max-h-[80vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col mx-4">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-border">
              <div>
                <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  {t.common.helpTitle}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{t.common.helpIntro}</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6 space-y-2">
              {sections.map((section, i) => {
                const isOpen = expandedIdx === i;
                return (
                  <div key={i} className="border border-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedIdx(isOpen ? null : i)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary/50 transition-colors"
                    >
                      <section.icon className="w-4 h-4 text-primary shrink-0" />
                      <span className="flex-1 text-sm font-semibold text-foreground">
                        {t.common[section.titleKey as keyof typeof t.common]}
                      </span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t.common[section.descKey as keyof typeof t.common]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Tip */}
              <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-xs text-primary font-medium">{t.common.helpTip}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
