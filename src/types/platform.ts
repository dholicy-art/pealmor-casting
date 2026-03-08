// Types for PEALMOR Casting Platform

export type AssetType = "face" | "voice" | "persona" | "avatar" | "motion";
export type RequestStatus = "pending" | "approved" | "rejected" | "counter_offered" | "cancelled";
export type ProjectStatus = "draft" | "casting" | "pending_approval" | "licensed" | "in_production" | "completed";
export type RiskLevel = "low" | "medium" | "high";
export type VerificationStatus = "pending" | "verified" | "rejected" | "suspended";
export type LicenseStatus = "active" | "expired" | "revoked" | "pending";

export interface TalentProfile {
  id: string;
  name: string;
  stageName: string;
  initials: string;
  intro: string;
  nationality: string;
  languages: string[];
  ageRange: string;
  genderExpression: string;
  tags: string[];
  moodTags: string[];
  styleTags: string[];
  voiceTags: string[];
  rating: number;
  reviewCount: number;
  startingPrice: number;
  currency: string;
  avgApprovalHours: number;
  verified: boolean;
  available: boolean;
  assets: AIAsset[];
  consentPolicy: ConsentPolicy;
  profileCompleteness: number;
  totalEarnings: number;
  monthlyEarnings: number;
  profileViews: number;
}

export interface AIAsset {
  id: string;
  type: AssetType;
  label: string;
  status: "active" | "pending" | "inactive";
  quality: string;
  fileCount: number;
}

export interface ConsentPolicy {
  id: string;
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
}

export interface CastingProject {
  id: string;
  clientId: string;
  title: string;
  brand: string;
  category: string;
  budgetRange: string;
  budget: number;
  productionType: string;
  targetRegions: string[];
  mediaChannels: string[];
  campaignPeriod: string;
  scriptSummary: string;
  status: ProjectStatus;
  riskLevel: RiskLevel;
  actorCount: number;
  createdAt: string;
  requests: CastingRequest[];
}

export interface CastingRequest {
  id: string;
  projectId: string;
  talentId: string;
  talentName: string;
  companyName: string;
  projectTitle: string;
  requestedAssets: AssetType[];
  requestedPurpose: string;
  requestedChannels: string[];
  requestedRegions: string;
  proposedFee: number;
  proposedRevenueShare: string;
  requestedTermDays: number;
  notes: string;
  status: RequestStatus;
  riskLevel: RiskLevel;
  policyConflicts: string[];
  createdAt: string;
  respondedAt?: string;
  counterOfferNotes?: string;
}

export interface LicenseGrant {
  id: string;
  requestId: string;
  projectTitle: string;
  talentName: string;
  companyName: string;
  grantedAssets: AssetType[];
  grantedScope: string;
  startAt: string;
  endAt: string;
  status: LicenseStatus;
  fee: number;
  revenueShare: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: "client" | "talent" | "admin" | "system";
  action: string;
  target: string;
  details?: string;
  severity: "info" | "warning" | "critical";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "request" | "approval" | "rejection" | "warning" | "settlement" | "system";
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface VerificationCase {
  id: string;
  userName: string;
  userType: "talent" | "client" | "company";
  submittedAt: string;
  documents: string[];
  status: VerificationStatus;
  notes: string;
  assignedTo?: string;
  riskFlags: string[];
}

export interface DisputeCase {
  id: string;
  title: string;
  reporter: string;
  reported: string;
  type: "unauthorized_use" | "scope_violation" | "settlement_dispute" | "contract_interpretation";
  status: "open" | "investigating" | "resolved" | "escalated";
  description: string;
  createdAt: string;
  priority: "low" | "medium" | "high" | "critical";
}
