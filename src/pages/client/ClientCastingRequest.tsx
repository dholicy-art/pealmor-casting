import ClientLayout from "@/components/layouts/ClientLayout";
import { Button } from "@/components/ui/button";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Shield } from "lucide-react";
import { getTalentById, projects } from "@/data/mockData";
import { usePlatformStore } from "@/store/platformStore";
import { useState } from "react";
import { toast } from "sonner";
import type { CastingRequest, AssetType } from "@/types/platform";
import { useI18n } from "@/i18n/I18nContext";

export default function ClientCastingRequest() {
  const { t } = useI18n();
  const { talentId } = useParams();
  const navigate = useNavigate();
  const talent = getTalentById(talentId || "");
  const { addRequest, addNotification } = usePlatformStore();

  const [form, setForm] = useState({
    projectId: projects[0]?.id || "",
    purpose: "",
    channels: [] as string[],
    regions: "",
    termDays: 30,
    fee: talent?.startingPrice || 500,
    revenueShare: "",
    notes: "",
    assets: [] as AssetType[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!talent) {
    return (
      <ClientLayout>
        <div className="p-6 text-center py-20">
          <p className="text-muted-foreground">Talent not found.</p>
        </div>
      </ClientLayout>
    );
  }

  const policy = talent.consentPolicy;

  // Validate against policy
  const policyWarnings: string[] = [];
  if (form.purpose && policy.blockedPurposes.some((b) => form.purpose.toLowerCase().includes(b.toLowerCase()))) {
    policyWarnings.push(`Purpose "${form.purpose}" is blocked by talent's consent policy.`);
  }
  if (form.termDays > policy.maxTermDays) {
    policyWarnings.push(`Requested term (${form.termDays} days) exceeds max allowed (${policy.maxTermDays} days).`);
  }
  if (form.regions) {
    const reqRegions = form.regions.split(",").map((r) => r.trim());
    const blocked = reqRegions.filter((r) => !policy.allowedRegions.some((ar) => ar.toLowerCase().includes(r.toLowerCase())) && r.toLowerCase() !== "");
    if (blocked.length > 0) {
      policyWarnings.push(`Regions "${blocked.join(", ")}" may not be covered by talent's policy (${policy.allowedRegions.join(", ")})`);
    }
  }

  const toggleAsset = (type: AssetType) => {
    setForm((f) => ({
      ...f,
      assets: f.assets.includes(type) ? f.assets.filter((a) => a !== type) : [...f.assets, type],
    }));
  };

  const toggleChannel = (ch: string) => {
    setForm((f) => ({
      ...f,
      channels: f.channels.includes(ch) ? f.channels.filter((c) => c !== ch) : [...f.channels, ch],
    }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.purpose) errs.purpose = "Purpose is required";
    if (form.assets.length === 0) errs.assets = "Select at least one asset";
    if (!form.regions) errs.regions = "Target region is required";
    if (form.channels.length === 0) errs.channels = "Select at least one channel";
    if (form.fee < 100) errs.fee = "Minimum fee is $100";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const project = projects.find((p) => p.id === form.projectId);
    // Create casting request locally — this will trigger PEALMOR UsageRequest API
    const newRequest: CastingRequest = {
      id: `r${Date.now()}`,
      projectId: form.projectId,
      talentId: talent.id,
      talentName: talent.name,
      companyName: project?.brand || "My Company",
      projectTitle: project?.title || "New Project",
      requestedAssets: form.assets,
      requestedPurpose: form.purpose,
      requestedChannels: form.channels,
      requestedRegions: form.regions,
      proposedFee: form.fee,
      proposedRevenueShare: form.revenueShare || "—",
      requestedTermDays: form.termDays,
      notes: form.notes,
      status: "pending",
      riskLevel: policyWarnings.length > 0 ? "medium" : "low",
      policyConflicts: policyWarnings,
      createdAt: new Date().toISOString().slice(0, 10),
      pealmorRequestRef: `PEALMOR-REQ-${Date.now()}`, // Will be assigned by PEALMOR API
    };

    addRequest(newRequest);
    addNotification({
      id: `n${Date.now()}`,
      title: "Usage Request Submitted",
      message: `Your PEALMOR usage request to ${talent.name} for "${project?.title}" has been submitted.`,
      type: "request",
      read: false,
      createdAt: new Date().toISOString(),
      link: "/talent/approvals",
    });

    toast.success(`${t.toast.castingRequestSent} ${talent.name}`);
    navigate("/client/projects");
  };

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 max-w-3xl space-y-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/client/actor/${talent.id}`}><ArrowLeft className="w-4 h-4 mr-1" /> Back to {talent.name}</Link>
        </Button>

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Casting Request</h1>
          <p className="text-muted-foreground text-sm mt-1">Send a casting request to {talent.name}</p>
        </div>

        {/* Talent Summary */}
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground">
            {talent.initials}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{talent.name}</p>
            <p className="text-xs text-muted-foreground">Starting at ${talent.startingPrice} • Max {policy.maxTermDays} days</p>
          </div>
          <div className="flex gap-1">
            {talent.assets.map((a) => (
              <span key={a.id} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium capitalize">{a.type}</span>
            ))}
          </div>
        </div>

        {/* Policy Warnings */}
        {policyWarnings.length > 0 && (
          <div className="bg-destructive/5 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <p className="text-sm font-medium text-destructive">Policy Warnings</p>
            </div>
            {policyWarnings.map((w, i) => (
              <p key={i} className="text-xs text-destructive pl-6">{w}</p>
            ))}
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">
          {/* Project */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Project</label>
            <select
              value={form.projectId}
              onChange={(e) => setForm({ ...form, projectId: e.target.value })}
              className="w-full h-10 px-3 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.title} ({p.brand})</option>
              ))}
            </select>
          </div>

          {/* Purpose */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Purpose *</label>
            <select
              value={form.purpose}
              onChange={(e) => setForm({ ...form, purpose: e.target.value })}
              className="w-full h-10 px-3 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select purpose</option>
              {["Commercial Ad", "Short-form Content", "Educational", "Product Demo", "Gaming", "Corporate", "Entertainment", "Chatbot"].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.purpose && <p className="text-xs text-destructive mt-1">{errors.purpose}</p>}
          </div>

          {/* Assets */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Requested Assets *</label>
            <div className="flex flex-wrap gap-2">
              {talent.assets.map((a) => (
                <button
                  key={a.id}
                  onClick={() => toggleAsset(a.type)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    form.assets.includes(a.type) ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
            {errors.assets && <p className="text-xs text-destructive mt-1">{errors.assets}</p>}
          </div>

          {/* Channels */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Channels *</label>
            <div className="flex flex-wrap gap-2">
              {["YouTube", "Instagram", "TikTok", "Website", "LinkedIn", "TV", "App"].map((ch) => (
                <button
                  key={ch}
                  onClick={() => toggleChannel(ch)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    form.channels.includes(ch) ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
            {errors.channels && <p className="text-xs text-destructive mt-1">{errors.channels}</p>}
          </div>

          {/* Regions */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Target Regions *</label>
            <input
              type="text"
              placeholder="e.g., Korea, Japan"
              value={form.regions}
              onChange={(e) => setForm({ ...form, regions: e.target.value })}
              className="w-full h-10 px-3 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <p className="text-xs text-muted-foreground mt-1">Allowed: {policy.allowedRegions.join(", ")}</p>
            {errors.regions && <p className="text-xs text-destructive mt-1">{errors.regions}</p>}
          </div>

          {/* Term & Fee */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Term (days)</label>
              <input
                type="number"
                value={form.termDays}
                onChange={(e) => setForm({ ...form, termDays: parseInt(e.target.value) || 0 })}
                min={1}
                max={365}
                className="w-full h-10 px-3 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-muted-foreground mt-1">Max: {policy.maxTermDays} days</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Proposed Fee (USD)</label>
              <input
                type="number"
                value={form.fee}
                onChange={(e) => setForm({ ...form, fee: parseInt(e.target.value) || 0 })}
                min={100}
                className="w-full h-10 px-3 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {errors.fee && <p className="text-xs text-destructive mt-1">{errors.fee}</p>}
            </div>
          </div>

          {/* Revenue Share */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Revenue Share (optional)</label>
            <input
              type="text"
              placeholder="e.g., 15%"
              value={form.revenueShare}
              onChange={(e) => setForm({ ...form, revenueShare: e.target.value })}
              className="w-full h-10 px-3 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Additional Notes</label>
            <textarea
              rows={4}
              placeholder="Describe your project needs, creative direction, etc."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="hero" className="flex-1" onClick={handleSubmit}>
              <Shield className="w-4 h-4" /> Submit Casting Request
            </Button>
            <Button variant="glass" asChild>
              <Link to={`/client/actor/${talent.id}`}>Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
