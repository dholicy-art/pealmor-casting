// PEALMOR Core API Types
// PEALMOR is the single source of truth for identity, consent, licensing, settlement, and rights management.

export type UsageRequestStatus = "pending" | "approved" | "rejected" | "counter_offered" | "cancelled";
export type LicenseGrantStatus = "active" | "expired" | "revoked" | "pending";
export type SettlementStatus = "pending" | "processing" | "completed" | "failed" | "disputed";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type AccessKeyStatus = "valid" | "expired" | "revoked" | "invalid";

// ── PEALMOR Identity & IP ──

export interface PealmorIPAsset {
  id: string;
  talentId: string;
  type: "face" | "voice" | "persona" | "avatar" | "motion";
  label: string;
  status: "registered" | "verified" | "suspended";
  quality: string;
  registeredAt: string;
  pealmorRef: string; // PEALMOR registry reference
}

export interface PealmorPolicy {
  id: string;
  talentId: string;
  allowedPurposes: string[];
  blockedPurposes: string[];
  allowedRegions: string[];
  blockedRegions: string[];
  allowedChannels: string[];
  maxTermDays: number;
  derivativeAllowed: "yes" | "no" | "conditional";
  voiceCloneAllowed: boolean;
  faceSwapAllowed: boolean;
  characterizationAllowed: boolean;
  version: number;
  lastUpdated: string;
  pealmorRef: string;
}

export interface PealmorTalentProfile {
  id: string;
  name: string;
  stageName: string;
  verified: boolean;
  identityRef: string; // PEALMOR identity reference
  ipAssets: PealmorIPAsset[];
  policy: PealmorPolicy;
}

// ── PEALMOR Usage Requests ──

export interface PealmorUsageRequest {
  id: string;
  projectId: string;
  talentId: string;
  clientId: string;
  requestedAssets: string[];
  purpose: string;
  channels: string[];
  regions: string;
  termDays: number;
  proposedFee: number;
  revenueShare: string;
  notes: string;
  status: UsageRequestStatus;
  policyConflicts: string[];
  riskLevel: "low" | "medium" | "high";
  createdAt: string;
  respondedAt?: string;
  counterOfferNotes?: string;
  pealmorRef: string;
}

// ── PEALMOR License Grant ──

export interface PealmorLicenseGrant {
  id: string;
  usageRequestId: string;
  projectTitle: string;
  talentName: string;
  clientName: string;
  grantedAssets: string[];
  grantedScope: string;
  startAt: string;
  endAt: string;
  status: LicenseGrantStatus;
  fee: number;
  revenueShare: string;
  accessKeyId?: string;
  pealmorRef: string;
}

// ── PEALMOR Access Control ──

export interface PealmorAccessKey {
  id: string;
  licenseId: string;
  talentId: string;
  clientId: string;
  assets: string[];
  issuedAt: string;
  expiresAt: string;
  status: AccessKeyStatus;
  usageCount: number;
  maxUsage: number;
  pealmorRef: string;
}

export interface PealmorAccessValidation {
  valid: boolean;
  accessKeyId: string;
  reason?: string;
  remainingUsage: number;
  expiresAt: string;
}

// ── PEALMOR Settlement ──

export interface PealmorSettlement {
  id: string;
  talentId: string;
  period: string;
  totalAmount: number;
  platformFee: number;
  netAmount: number;
  status: SettlementStatus;
  items: PealmorSettlementItem[];
  processedAt?: string;
  pealmorRef: string;
}

export interface PealmorSettlementItem {
  licenseId: string;
  projectTitle: string;
  clientName: string;
  amount: number;
  revenueShare: number;
  period: string;
}

// ── PEALMOR Payment ──

export interface PealmorPayment {
  id: string;
  settlementId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  processedAt?: string;
  pealmorRef: string;
}

// ── PEALMOR Audit ──

export interface PealmorAuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: "client" | "talent" | "admin" | "system";
  action: string;
  target: string;
  details?: string;
  severity: "info" | "warning" | "critical";
  pealmorRef: string;
}

// ── AI Audition ──

export interface AIAuditionRequest {
  id: string;
  projectId: string;
  script: string;
  type: "voice" | "face" | "full";
  emotionTones: string[];
  selectedTalentIds: string[];
  status: "pending" | "generating" | "completed" | "failed";
  createdAt: string;
}

export interface AIAuditionPerformance {
  id: string;
  auditionId: string;
  talentId: string;
  talentName: string;
  type: "voice" | "face" | "full";
  emotionTone: string;
  score: number;
  duration: number;
  previewUrl: string; // mock URL
  status: "ready" | "generating";
}
