/**
 * PEALMOR Core API Service Layer
 *
 * Mock implementations of all PEALMOR Core APIs.
 * When PEALMOR Core APIs become available, replace mock data with real fetch calls.
 *
 * Architecture principle:
 * "PEALMOR is the single source of truth for identity, consent, licensing, settlement, and rights management."
 * The casting platform is only a discovery and orchestration interface.
 */

import type {
  PealmorIPAsset,
  PealmorPolicy,
  PealmorTalentProfile,
  PealmorUsageRequest,
  PealmorLicenseGrant,
  PealmorAccessKey,
  PealmorAccessValidation,
  PealmorSettlement,
  PealmorPayment,
  PealmorAuditEntry,
  AIAuditionPerformance,
  ActorGraphEdge,
  ActorTeam,
  ActorUniverse,
  AutoCastingResult,
} from "@/types/pealmor";
import { talents, actorGraph, actorTeams, actorUniverses } from "@/data/mockData";

// ═══════════════════════════════════════
// Mock Data
// ═══════════════════════════════════════

const mockLicenses: PealmorLicenseGrant[] = [
  {
    id: "pl1", usageRequestId: "r3", projectTitle: "Product Launch Intro",
    talentName: "Mika Tanaka", clientName: "NovaSkin",
    grantedAssets: ["face", "voice"], grantedScope: "Short-form content for TikTok and Instagram",
    startAt: "2026-02-25", endAt: "2026-03-27", status: "active",
    fee: 1200, revenueShare: "10%", accessKeyId: "ak1", pealmorRef: "PEALMOR-LIC-001",
  },
  {
    id: "pl2", usageRequestId: "r5", projectTitle: "Holiday Short-form Series",
    talentName: "Yuna Park", clientName: "LuxeBeauty Co.",
    grantedAssets: ["face", "voice", "persona"], grantedScope: "Holiday campaign content",
    startAt: "2025-12-15", endAt: "2026-01-31", status: "expired",
    fee: 3500, revenueShare: "15%", pealmorRef: "PEALMOR-LIC-002",
  },
];

const mockAccessKeys: PealmorAccessKey[] = [
  {
    id: "ak1", licenseId: "pl1", talentId: "t3", clientId: "c1",
    assets: ["face", "voice"], issuedAt: "2026-02-25", expiresAt: "2026-03-27",
    status: "valid", usageCount: 12, maxUsage: 100, pealmorRef: "PEALMOR-AK-001",
  },
  {
    id: "ak2", licenseId: "pl2", talentId: "t1", clientId: "c1",
    assets: ["face", "voice", "persona"], issuedAt: "2025-12-15", expiresAt: "2026-01-31",
    status: "expired", usageCount: 45, maxUsage: 200, pealmorRef: "PEALMOR-AK-002",
  },
];

const mockSettlements: PealmorSettlement[] = [
  {
    id: "ps1", talentId: "t1", period: "Mar 2026", totalAmount: 4200, platformFee: 420, netAmount: 3780,
    status: "completed", processedAt: "2026-03-05",
    items: [
      { licenseId: "pl2", projectTitle: "Holiday Short-form Series", clientName: "LuxeBeauty Co.", amount: 3500, revenueShare: 525, period: "Dec 2025 - Jan 2026" },
      { licenseId: "pl1", projectTitle: "Product Launch Intro", clientName: "NovaSkin", amount: 700, revenueShare: 0, period: "Feb 2026" },
    ],
    pealmorRef: "PEALMOR-SET-001",
  },
  {
    id: "ps2", talentId: "t1", period: "Feb 2026", totalAmount: 3400, platformFee: 340, netAmount: 3060,
    status: "completed", processedAt: "2026-02-05",
    items: [
      { licenseId: "pl2", projectTitle: "Holiday Short-form Series", clientName: "LuxeBeauty Co.", amount: 3400, revenueShare: 510, period: "Dec 2025 - Jan 2026" },
    ],
    pealmorRef: "PEALMOR-SET-002",
  },
  {
    id: "ps3", talentId: "t1", period: "Jan 2026", totalAmount: 3800, platformFee: 380, netAmount: 3420,
    status: "completed", processedAt: "2026-01-05",
    items: [
      { licenseId: "pl2", projectTitle: "Holiday Short-form Series", clientName: "LuxeBeauty Co.", amount: 3800, revenueShare: 570, period: "Dec 2025" },
    ],
    pealmorRef: "PEALMOR-SET-003",
  },
  {
    id: "ps4", talentId: "t1", period: "Apr 2026", totalAmount: 1800, platformFee: 180, netAmount: 1620,
    status: "pending",
    items: [
      { licenseId: "pl1", projectTitle: "Brand Ambassador Video", clientName: "TechFlow", amount: 1800, revenueShare: 0, period: "Mar 2026" },
    ],
    pealmorRef: "PEALMOR-SET-004",
  },
];

const mockPayments: PealmorPayment[] = [
  { id: "pp1", settlementId: "ps1", amount: 3780, currency: "USD", status: "paid", method: "Bank Transfer", processedAt: "2026-03-06", pealmorRef: "PEALMOR-PAY-001" },
  { id: "pp2", settlementId: "ps2", amount: 3060, currency: "USD", status: "paid", method: "Bank Transfer", processedAt: "2026-02-06", pealmorRef: "PEALMOR-PAY-002" },
  { id: "pp3", settlementId: "ps3", amount: 3420, currency: "USD", status: "paid", method: "Bank Transfer", processedAt: "2026-01-06", pealmorRef: "PEALMOR-PAY-003" },
  { id: "pp4", settlementId: "ps4", amount: 1620, currency: "USD", status: "pending", method: "Bank Transfer", pealmorRef: "PEALMOR-PAY-004" },
];

const mockAuditLogs: PealmorAuditEntry[] = [
  { id: "pal1", timestamp: "2026-03-08 10:32", userId: "c1", userName: "LuxeBeauty", userRole: "client", action: "UsageRequest submitted", target: "Yuna Park", severity: "info", pealmorRef: "PEALMOR-AUD-001" },
  { id: "pal2", timestamp: "2026-03-08 10:15", userId: "t1", userName: "Yuna Park", userRole: "talent", action: "UsageRequest approved", target: "NovaSkin — Brand Video", severity: "info", pealmorRef: "PEALMOR-AUD-002" },
  { id: "pal3", timestamp: "2026-03-08 09:48", userId: "sys", userName: "PEALMOR System", userRole: "system", action: "Policy conflict detected", target: "TechFlow request", severity: "warning", pealmorRef: "PEALMOR-AUD-003" },
  { id: "pal4", timestamp: "2026-03-08 09:30", userId: "admin1", userName: "Admin Kim", userRole: "admin", action: "Identity verified via PEALMOR", target: "Hana Ito", severity: "info", pealmorRef: "PEALMOR-AUD-004" },
  { id: "pal5", timestamp: "2026-03-08 09:12", userId: "sys", userName: "PEALMOR System", userRole: "system", action: "LicenseGrant expired", target: "Project #p4 — Holiday Series", severity: "warning", pealmorRef: "PEALMOR-AUD-005" },
  { id: "pal6", timestamp: "2026-03-07 18:45", userId: "t3", userName: "Mika Tanaka", userRole: "talent", action: "Consent policy updated via PEALMOR", target: "Policy v4", severity: "info", pealmorRef: "PEALMOR-AUD-006" },
  { id: "pal7", timestamp: "2026-03-07 16:20", userId: "c1", userName: "LuxeBeauty", userRole: "client", action: "Project created (casting platform)", target: "Summer Campaign 2026", severity: "info", pealmorRef: "PEALMOR-AUD-007" },
  { id: "pal8", timestamp: "2026-03-07 14:10", userId: "sys", userName: "PEALMOR System", userRole: "system", action: "Unauthorized asset access detected", target: "TikTok content — unlicensed region", severity: "critical", pealmorRef: "PEALMOR-AUD-008" },
  { id: "pal9", timestamp: "2026-03-07 11:30", userId: "admin1", userName: "Admin Kim", userRole: "admin", action: "Dispute resolved via PEALMOR", target: "Scope violation case", severity: "info", pealmorRef: "PEALMOR-AUD-009" },
  { id: "pal10", timestamp: "2026-03-06 09:00", userId: "t5", userName: "Hana Ito", userRole: "talent", action: "IP Asset registered in PEALMOR", target: "Virtual Avatar v2", severity: "info", pealmorRef: "PEALMOR-AUD-010" },
];

// ═══════════════════════════════════════
// API Functions (Mock — replace with real API calls)
// ═══════════════════════════════════════

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ── Identity & IP ──

export async function getIPAssets(talentId: string): Promise<PealmorIPAsset[]> {
  await delay(100);
  return [];
}

export async function getPolicies(talentId: string): Promise<PealmorPolicy[]> {
  await delay(100);
  return [];
}

export async function getTalentProfile(talentId: string): Promise<PealmorTalentProfile | null> {
  await delay(100);
  return null;
}

// ── Usage Requests ──

export async function submitUsageRequest(request: Omit<PealmorUsageRequest, "id" | "pealmorRef" | "status" | "createdAt">): Promise<PealmorUsageRequest> {
  await delay(200);
  return {
    ...request,
    id: `pur-${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
    pealmorRef: `PEALMOR-REQ-${Date.now()}`,
  };
}

export async function updateUsageRequest(requestId: string, update: { status: string; counterNotes?: string }): Promise<void> {
  await delay(100);
}

export async function cancelUsageRequest(requestId: string): Promise<void> {
  await delay(100);
}

// ── Approval ──

export async function approveRequest(requestId: string): Promise<PealmorLicenseGrant> {
  await delay(200);
  return {
    id: `pl-${Date.now()}`,
    usageRequestId: requestId,
    projectTitle: "Auto-generated",
    talentName: "Talent",
    clientName: "Client",
    grantedAssets: [],
    grantedScope: "As per usage request",
    startAt: new Date().toISOString().slice(0, 10),
    endAt: new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10),
    status: "active",
    fee: 0,
    revenueShare: "—",
    pealmorRef: `PEALMOR-LIC-${Date.now()}`,
  };
}

export async function rejectRequest(requestId: string): Promise<void> {
  await delay(100);
}

// ── Licensing ──

export async function getLicenseStatus(filter?: { talentId?: string; clientId?: string }): Promise<PealmorLicenseGrant[]> {
  await delay(150);
  return mockLicenses;
}

export async function grantLicense(usageRequestId: string): Promise<PealmorLicenseGrant> {
  return approveRequest(usageRequestId);
}

// ── Access Control ──

export async function issueAccessKey(licenseId: string): Promise<PealmorAccessKey> {
  await delay(100);
  return {
    id: `ak-${Date.now()}`,
    licenseId,
    talentId: "",
    clientId: "",
    assets: [],
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 60 * 86400000).toISOString(),
    status: "valid",
    usageCount: 0,
    maxUsage: 100,
    pealmorRef: `PEALMOR-AK-${Date.now()}`,
  };
}

export async function validateAccessKey(accessKeyId: string): Promise<PealmorAccessValidation> {
  await delay(50);
  const key = mockAccessKeys.find((k) => k.id === accessKeyId);
  if (!key || key.status !== "valid") {
    return {
      valid: false,
      accessKeyId,
      reason: key ? `AccessKey is ${key.status}` : "AccessKey not found",
      remainingUsage: 0,
      expiresAt: "",
    };
  }
  return {
    valid: true,
    accessKeyId,
    remainingUsage: key.maxUsage - key.usageCount,
    expiresAt: key.expiresAt,
  };
}

export async function getAccessKeys(filter?: { clientId?: string; talentId?: string }): Promise<PealmorAccessKey[]> {
  await delay(100);
  return mockAccessKeys;
}

// ── Settlement ──

export async function getSettlementStatus(talentId: string): Promise<PealmorSettlement[]> {
  await delay(150);
  return mockSettlements.filter((s) => s.talentId === talentId);
}

// ── Payment ──

export async function getPaymentStatus(filter?: { talentId?: string; settlementId?: string }): Promise<PealmorPayment[]> {
  await delay(100);
  if (filter?.settlementId) {
    return mockPayments.filter((p) => p.settlementId === filter.settlementId);
  }
  return mockPayments;
}

// ── Audit ──

export async function getAuditLog(filter?: { severity?: string; userRole?: string }): Promise<PealmorAuditEntry[]> {
  await delay(100);
  let logs = mockAuditLogs;
  if (filter?.severity && filter.severity !== "all") {
    logs = logs.filter((l) => l.severity === filter.severity);
  }
  if (filter?.userRole && filter.userRole !== "all") {
    logs = logs.filter((l) => l.userRole === filter.userRole);
  }
  return logs;
}

// ── AI Audition (Casting Platform Feature) ──

export async function generateAuditionPerformances(
  talentIds: string[],
  script: string,
  type: "voice" | "face" | "full",
  emotionTones: string[]
): Promise<AIAuditionPerformance[]> {
  await delay(500);
  const talentNames: Record<string, string> = {
    t1: "Yuna Park", t2: "Alex Chen", t3: "Mika Tanaka",
    t4: "Seo-jin Lee", t5: "Hana Ito", t6: "David Kwon",
  };

  const performances: AIAuditionPerformance[] = [];
  for (const talentId of talentIds) {
    for (const tone of emotionTones) {
      performances.push({
        id: `perf-${talentId}-${tone}-${Date.now()}`,
        auditionId: `aud-${Date.now()}`,
        talentId,
        talentName: talentNames[talentId] || "Unknown",
        type,
        emotionTone: tone,
        score: Math.round(70 + Math.random() * 30),
        duration: Math.round(10 + Math.random() * 50),
        previewUrl: `#mock-preview-${talentId}-${tone}`,
        status: "ready",
      });
    }
  }
  return performances;
}

// ── Actor Network ──

export async function getActorGraph(actorId?: string): Promise<ActorGraphEdge[]> {
  await delay(100);
  if (actorId) {
    return actorGraph.filter(e => e.actorId === actorId || e.relatedActorId === actorId);
  }
  return actorGraph;
}

export async function getActorTeamsApi(actorId?: string): Promise<ActorTeam[]> {
  await delay(100);
  if (actorId) {
    return actorTeams.filter(t => t.members.some(m => m.actorId === actorId));
  }
  return actorTeams;
}

export async function getActorUniversesApi(actorId?: string): Promise<ActorUniverse[]> {
  await delay(100);
  if (actorId) {
    return actorUniverses.filter(u => u.actors.some(a => a.actorId === actorId));
  }
  return actorUniverses;
}

// ── Auto Casting ──

export async function autocast(scriptSummary: string): Promise<AutoCastingResult[]> {
  await delay(800);

  // Mock: analyze script and recommend actors based on keywords
  const script = scriptSummary.toLowerCase();
  const results: AutoCastingResult[] = [];

  // Lead role
  if (script.includes("beauty") || script.includes("luxury") || script.includes("elegant")) {
    results.push({
      role: "lead", characterName: "Brand Muse", characterDescription: "Elegant, sophisticated presence for luxury brand representation.",
      recommendedActorId: "t1", matchScore: 95, matchReasons: ["Style: Luxury/Premium", "Mood: Sophisticated", "Voice: Warm & Clear"],
    });
  } else if (script.includes("tech") || script.includes("education") || script.includes("demo")) {
    results.push({
      role: "lead", characterName: "Tech Presenter", characterDescription: "Knowledgeable and approachable tech narrator.",
      recommendedActorId: "t2", matchScore: 92, matchReasons: ["Style: Tech-savvy", "Multilingual", "Voice: Engaging"],
    });
  } else {
    results.push({
      role: "lead", characterName: "Main Character", characterDescription: "Versatile lead actor for general content.",
      recommendedActorId: "t1", matchScore: 88, matchReasons: ["High rating", "Versatile style", "Fast approval"],
    });
  }

  // Supporting role
  if (script.includes("fun") || script.includes("energetic") || script.includes("young")) {
    results.push({
      role: "supporting", characterName: "Energetic Co-Star", characterDescription: "Playful and dynamic supporting presence.",
      recommendedActorId: "t3", matchScore: 90, matchReasons: ["Mood: Energetic", "Style: Trendy", "Short-form specialist"],
    });
  } else {
    results.push({
      role: "supporting", characterName: "Supporting Narrator", characterDescription: "Professional supporting voice.",
      recommendedActorId: "t6", matchScore: 78, matchReasons: ["Voice: Deep & Steady", "Professional demeanor"],
    });
  }

  // Side character
  if (script.includes("gaming") || script.includes("virtual") || script.includes("avatar")) {
    results.push({
      role: "side", characterName: "Virtual Character", characterDescription: "Cute virtual avatar for interactive content.",
      recommendedActorId: "t5", matchScore: 93, matchReasons: ["Avatar available", "Gaming specialist", "High engagement"],
    });
  } else {
    results.push({
      role: "side", characterName: "Expert Cameo", characterDescription: "Authoritative brief appearance.",
      recommendedActorId: "t4", matchScore: 72, matchReasons: ["Authoritative tone", "Corporate fit"],
    });
  }

  return results;
}
