import AdminLayout from "@/components/layouts/AdminLayout";
import { useI18n } from "@/i18n/I18nContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Copy, Eye, EyeOff, RefreshCw, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiEndpoint {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  status: "active" | "inactive" | "error";
  lastCalled?: string;
  description: string;
}

const outgoingApis: ApiEndpoint[] = [
  {
    id: "out1", name: "PEALMOR Identity Verify", method: "POST",
    url: "https://api.pealmor.com/v1/identity/verify",
    status: "active", lastCalled: "2026-03-09 10:32",
    description: "Sends identity verification request to PEALMOR Core",
  },
  {
    id: "out2", name: "PEALMOR License Grant", method: "POST",
    url: "https://api.pealmor.com/v1/licenses/grant",
    status: "active", lastCalled: "2026-03-09 09:15",
    description: "Issues license grant through PEALMOR settlement",
  },
  {
    id: "out3", name: "PEALMOR Audit Log", method: "POST",
    url: "https://api.pealmor.com/v1/audit/log",
    status: "active", lastCalled: "2026-03-09 10:45",
    description: "Sends audit events to PEALMOR compliance system",
  },
  {
    id: "out4", name: "PEALMOR Settlement", method: "POST",
    url: "https://api.pealmor.com/v1/settlement/process",
    status: "inactive", lastCalled: "2026-03-08 18:00",
    description: "Triggers settlement processing via PEALMOR",
  },
  {
    id: "out5", name: "PEALMOR Dispute Report", method: "POST",
    url: "https://api.pealmor.com/v1/disputes/report",
    status: "active", lastCalled: "2026-03-07 14:20",
    description: "Reports disputes to PEALMOR resolution system",
  },
];

const incomingApis: ApiEndpoint[] = [
  {
    id: "in1", name: "Webhook: License Expired", method: "POST",
    url: "/api/webhooks/pealmor/license-expired",
    status: "active", lastCalled: "2026-03-09 09:12",
    description: "Receives license expiration notifications from PEALMOR",
  },
  {
    id: "in2", name: "Webhook: Policy Updated", method: "POST",
    url: "/api/webhooks/pealmor/policy-updated",
    status: "active", lastCalled: "2026-03-08 16:45",
    description: "Receives consent policy change events from PEALMOR",
  },
  {
    id: "in3", name: "Webhook: Settlement Complete", method: "POST",
    url: "/api/webhooks/pealmor/settlement-complete",
    status: "active", lastCalled: "2026-03-08 12:00",
    description: "Receives settlement completion notifications",
  },
  {
    id: "in4", name: "Webhook: Unauthorized Access", method: "POST",
    url: "/api/webhooks/pealmor/unauthorized-access",
    status: "error", lastCalled: "2026-03-07 14:10",
    description: "Receives unauthorized asset access alerts",
  },
  {
    id: "in5", name: "Webhook: Identity Verified", method: "POST",
    url: "/api/webhooks/pealmor/identity-verified",
    status: "active", lastCalled: "2026-03-09 08:30",
    description: "Receives identity verification results from PEALMOR",
  },
];

const statusIcon = (status: string) => {
  switch (status) {
    case "active": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case "inactive": return <Clock className="w-4 h-4 text-muted-foreground" />;
    case "error": return <XCircle className="w-4 h-4 text-destructive" />;
    default: return null;
  }
};

const statusBadge = (status: string) => {
  switch (status) {
    case "active": return <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/10">Active</Badge>;
    case "inactive": return <Badge variant="secondary">Inactive</Badge>;
    case "error": return <Badge variant="destructive">Error</Badge>;
    default: return null;
  }
};

const methodBadge = (method: string) => {
  const colors: Record<string, string> = {
    GET: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    POST: "bg-green-500/10 text-green-600 border-green-500/20",
    PUT: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    DELETE: "bg-red-500/10 text-red-600 border-red-500/20",
    PATCH: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  };
  return <Badge variant="outline" className={`${colors[method] || ""} font-mono text-xs hover:${colors[method] || ""}`}>{method}</Badge>;
};

export default function AdminApi() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [showKey, setShowKey] = useState(false);
  const apiKey = "pk_live_pealmor_xxxx_xxxx_xxxx_1234";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: t.toast.linkCopied });
  };

  const renderApiList = (apis: ApiEndpoint[], direction: "outgoing" | "incoming") => (
    <div className="space-y-3">
      {apis.map((api) => (
        <Card key={api.id} className="border border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 shrink-0">
                {statusIcon(api.status)}
                {methodBadge(api.method)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="font-medium text-sm text-foreground">{api.name}</span>
                  {statusBadge(api.status)}
                </div>
                <p className="text-xs text-muted-foreground mt-1 break-all font-mono">{api.url}</p>
                <p className="text-xs text-muted-foreground mt-1">{api.description}</p>
                {api.lastCalled && (
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {t.admin.apiLastCalled}: {api.lastCalled}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(api.url)}>
                  <Copy className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <RefreshCw className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl space-y-6">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground">{t.admin.apiManagement}</h1>
          <p className="text-sm mt-1 text-muted-foreground">{t.admin.apiManagementDesc}</p>
        </div>

        {/* API Key Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t.admin.apiKey}</CardTitle>
            <CardDescription>{t.admin.apiKeyDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Input
                  readOnly
                  value={showKey ? apiKey : "pk_live_pealmor_••••_••••_••••_••••"}
                  className="font-mono text-sm pr-20"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowKey(!showKey)}>
                    {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(apiKey)}>
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                {t.admin.regenerateKey}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Tabs */}
        <Tabs defaultValue="outgoing" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="outgoing" className="flex items-center gap-2 flex-1 sm:flex-none">
              <ArrowUpRight className="w-4 h-4" />
              <span className="hidden sm:inline">{t.admin.outgoingApi}</span>
              <span className="sm:hidden">{t.admin.outgoing}</span>
              <Badge variant="secondary" className="ml-1 text-xs">{outgoingApis.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="incoming" className="flex items-center gap-2 flex-1 sm:flex-none">
              <ArrowDownLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t.admin.incomingApi}</span>
              <span className="sm:hidden">{t.admin.incoming}</span>
              <Badge variant="secondary" className="ml-1 text-xs">{incomingApis.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="outgoing" className="mt-4">
            <div className="mb-3">
              <p className="text-sm text-muted-foreground">{t.admin.outgoingApiDesc}</p>
            </div>
            {renderApiList(outgoingApis, "outgoing")}
          </TabsContent>

          <TabsContent value="incoming" className="mt-4">
            <div className="mb-3">
              <p className="text-sm text-muted-foreground">{t.admin.incomingApiDesc}</p>
            </div>
            {renderApiList(incomingApis, "incoming")}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
