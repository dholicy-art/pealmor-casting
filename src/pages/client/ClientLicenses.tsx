import ClientLayout from "@/components/layouts/ClientLayout";
import { FileCheck, Clock, AlertTriangle, Shield } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { useEffect, useState } from "react";
import { getLicenseStatus } from "@/services/pealmorApi";
import type { PealmorLicenseGrant } from "@/types/pealmor";

const statusColors: Record<string, string> = {
  active: "bg-success/10 text-success",
  expired: "bg-muted text-muted-foreground",
  revoked: "bg-destructive/10 text-destructive",
  pending: "bg-warning/10 text-warning",
};

export default function ClientLicenses() {
  const { t } = useI18n();
  const [licenses, setLicenses] = useState<PealmorLicenseGrant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLicenseStatus({ clientId: "c1" }).then((data) => {
      setLicenses(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <ClientLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center py-20">
          <p className="text-muted-foreground">{t.common.loading}</p>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t.client.licenses}</h1>
          <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
            <Shield className="w-3 h-3" />
            PEALMOR {t.client.licenses} — {t.client.readOnlyView}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="flex items-center gap-2 mb-2"><FileCheck className="w-4 h-4 text-success" /><span className="text-xs text-muted-foreground">{t.common.active}</span></div>
            <p className="font-display text-2xl font-bold text-foreground">{licenses.filter((l) => l.status === "active").length}</p>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="flex items-center gap-2 mb-2"><Clock className="w-4 h-4 text-warning" /><span className="text-xs text-muted-foreground">{t.client.expiringSoon}</span></div>
            <p className="font-display text-2xl font-bold text-foreground">
              {licenses.filter((l) => l.status === "active" && new Date(l.endAt) < new Date(Date.now() + 7 * 86400000)).length}
            </p>
          </div>
          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4 text-muted-foreground" /><span className="text-xs text-muted-foreground">{t.common.expired}</span></div>
            <p className="font-display text-2xl font-bold text-foreground">{licenses.filter((l) => l.status === "expired").length}</p>
          </div>
        </div>

        <div className="space-y-4">
          {licenses.map((l) => (
            <div key={l.id} className="bg-card rounded-xl border border-border p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{l.projectTitle}</h3>
                  <p className="text-sm text-muted-foreground">{l.talentName} • {l.clientName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[l.status]}`}>
                    {l.status}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-primary/5 text-primary">{l.pealmorRef}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground text-xs">{t.client.assets}</span>
                  <div className="flex gap-1 mt-1">
                    {l.grantedAssets.map((a) => (
                      <span key={a} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium capitalize">{a}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">{t.client.period}</span>
                  <p className="text-foreground mt-1">{l.startAt} — {l.endAt}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">{t.client.fee}</span>
                  <p className="text-foreground mt-1 font-medium">${l.fee.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">{t.client.revenueShare}</span>
                  <p className="text-foreground mt-1">{l.revenueShare}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">{l.grantedScope}</p>
              {l.accessKeyId && (
                <div className="mt-2 flex items-center gap-2">
                  <Shield className="w-3 h-3 text-success" />
                  <span className="text-[10px] text-success font-medium">AccessKey: {l.accessKeyId}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ClientLayout>
  );
}
