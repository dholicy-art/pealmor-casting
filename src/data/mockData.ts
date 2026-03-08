import type {
  TalentProfile, CastingProject, CastingRequest,
  AuditLogEntry, Notification, VerificationCase, DisputeCase
} from "@/types/platform";

// ── Talent Profiles ──
// NOTE: totalEarnings, monthlyEarnings removed from TalentProfile.
// Revenue data is now fetched from PEALMOR Settlement API.
export const talents: TalentProfile[] = [
  {
    id: "t1", name: "Yuna Park", stageName: "Yuna", initials: "YP",
    intro: "Sophisticated, elegant AI persona for premium brands and luxury campaigns.",
    nationality: "Korean", languages: ["Korean", "English"], ageRange: "20s",
    genderExpression: "Female",
    tags: ["Korean", "20s", "Elegant", "Luxury", "Ad-ready", "English OK"],
    moodTags: ["Sophisticated", "Calm", "Graceful"],
    styleTags: ["Premium", "Luxury", "High-fashion"],
    voiceTags: ["Soft", "Warm", "Clear"],
    rating: 4.9, reviewCount: 47, startingPrice: 800, currency: "USD",
    avgApprovalHours: 12, verified: true, available: true,
    profileCompleteness: 85, profileViews: 347,
    assets: [
      { id: "a1", type: "face", label: "Face Image Set", status: "active", quality: "A+", fileCount: 24 },
      { id: "a2", type: "voice", label: "Voice Clone", status: "active", quality: "A", fileCount: 8 },
      { id: "a3", type: "persona", label: "Persona Model", status: "active", quality: "A+", fileCount: 1 },
    ],
    consentPolicy: {
      id: "cp1", allowedPurposes: ["Ads", "Short-form", "Educational", "Chatbot"],
      blockedPurposes: ["Political", "Adult", "Violence", "Religious"],
      allowedRegions: ["Korea", "Japan", "Southeast Asia"],
      blockedRegions: ["Global unrestricted"],
      allowedChannels: ["YouTube", "Instagram", "TikTok", "Website"],
      maxTermDays: 90, derivativeAllowed: "conditional",
      voiceCloneAllowed: true, faceSwapAllowed: false,
      characterizationAllowed: true, version: 3,
    },
  },
  {
    id: "t2", name: "Alex Chen", stageName: "Alex", initials: "AC",
    intro: "Warm and approachable AI persona ideal for educational and tech content.",
    nationality: "Chinese", languages: ["Chinese", "English", "Japanese"], ageRange: "30s",
    genderExpression: "Male",
    tags: ["Chinese", "30s", "Warm", "Educational", "Multilingual"],
    moodTags: ["Friendly", "Approachable", "Trustworthy"],
    styleTags: ["Casual", "Tech-savvy", "Modern"],
    voiceTags: ["Clear", "Engaging", "Natural"],
    rating: 4.7, reviewCount: 32, startingPrice: 600, currency: "USD",
    avgApprovalHours: 8, verified: true, available: true,
    profileCompleteness: 92, profileViews: 256,
    assets: [
      { id: "a4", type: "face", label: "Face Image Set", status: "active", quality: "A", fileCount: 18 },
      { id: "a5", type: "voice", label: "Voice Clone", status: "active", quality: "A+", fileCount: 12 },
      { id: "a6", type: "persona", label: "Persona Model", status: "active", quality: "A", fileCount: 1 },
    ],
    consentPolicy: {
      id: "cp2", allowedPurposes: ["Ads", "Short-form", "Educational", "Demo", "Chatbot"],
      blockedPurposes: ["Political", "Adult", "Violence"],
      allowedRegions: ["Global"],
      blockedRegions: [],
      allowedChannels: ["YouTube", "Website", "App", "LinkedIn"],
      maxTermDays: 180, derivativeAllowed: "yes",
      voiceCloneAllowed: true, faceSwapAllowed: true,
      characterizationAllowed: true, version: 2,
    },
  },
  {
    id: "t3", name: "Mika Tanaka", stageName: "Mika", initials: "MT",
    intro: "Energetic and playful AI persona perfect for short-form and entertainment content.",
    nationality: "Japanese", languages: ["Japanese", "English"], ageRange: "20s",
    genderExpression: "Female",
    tags: ["Japanese", "20s", "Energetic", "Short-form", "Entertainment"],
    moodTags: ["Playful", "Energetic", "Fun"],
    styleTags: ["Pop", "Trendy", "Youthful"],
    voiceTags: ["Bright", "Lively", "Expressive"],
    rating: 4.8, reviewCount: 38, startingPrice: 700, currency: "USD",
    avgApprovalHours: 6, verified: true, available: true,
    profileCompleteness: 95, profileViews: 412,
    assets: [
      { id: "a7", type: "face", label: "Face Image Set", status: "active", quality: "A+", fileCount: 30 },
      { id: "a8", type: "voice", label: "Voice Clone", status: "active", quality: "A", fileCount: 6 },
    ],
    consentPolicy: {
      id: "cp3", allowedPurposes: ["Ads", "Short-form", "Entertainment", "Gaming"],
      blockedPurposes: ["Political", "Adult", "Religious"],
      allowedRegions: ["Japan", "Korea", "Global"],
      blockedRegions: [],
      allowedChannels: ["YouTube", "TikTok", "Instagram", "Twitch"],
      maxTermDays: 60, derivativeAllowed: "yes",
      voiceCloneAllowed: true, faceSwapAllowed: false,
      characterizationAllowed: true, version: 4,
    },
  },
  {
    id: "t4", name: "Seo-jin Lee", stageName: "Seo-jin", initials: "SL",
    intro: "Professional and authoritative AI persona for corporate and finance content.",
    nationality: "Korean", languages: ["Korean", "English"], ageRange: "30s",
    genderExpression: "Male",
    tags: ["Korean", "30s", "Professional", "Corporate", "Finance"],
    moodTags: ["Authoritative", "Calm", "Serious"],
    styleTags: ["Business", "Corporate", "Formal"],
    voiceTags: ["Deep", "Resonant", "Measured"],
    rating: 4.6, reviewCount: 21, startingPrice: 900, currency: "USD",
    avgApprovalHours: 24, verified: true, available: false,
    profileCompleteness: 78, profileViews: 156,
    assets: [
      { id: "a9", type: "face", label: "Face Image Set", status: "active", quality: "A", fileCount: 15 },
    ],
    consentPolicy: {
      id: "cp4", allowedPurposes: ["Corporate", "Educational", "Finance", "News"],
      blockedPurposes: ["Adult", "Entertainment", "Gaming", "Political"],
      allowedRegions: ["Korea"],
      blockedRegions: ["Global"],
      allowedChannels: ["Website", "LinkedIn", "Corporate App"],
      maxTermDays: 120, derivativeAllowed: "no",
      voiceCloneAllowed: false, faceSwapAllowed: false,
      characterizationAllowed: false, version: 1,
    },
  },
  {
    id: "t5", name: "Hana Ito", stageName: "Hana", initials: "HI",
    intro: "Cheerful and cute AI persona ideal for gaming and virtual content.",
    nationality: "Japanese", languages: ["Japanese"], ageRange: "20s",
    genderExpression: "Female",
    tags: ["Japanese", "20s", "Cute", "Gaming", "Virtual"],
    moodTags: ["Cheerful", "Sweet", "Adorable"],
    styleTags: ["Kawaii", "Gaming", "Virtual"],
    voiceTags: ["Sweet", "High-pitched", "Animated"],
    rating: 4.9, reviewCount: 55, startingPrice: 750, currency: "USD",
    avgApprovalHours: 4, verified: true, available: true,
    profileCompleteness: 100, profileViews: 580,
    assets: [
      { id: "a10", type: "face", label: "Face Image Set", status: "active", quality: "A+", fileCount: 40 },
      { id: "a11", type: "voice", label: "Voice Clone", status: "active", quality: "A+", fileCount: 15 },
      { id: "a12", type: "avatar", label: "Virtual Avatar", status: "active", quality: "A", fileCount: 3 },
    ],
    consentPolicy: {
      id: "cp5", allowedPurposes: ["Gaming", "Entertainment", "Short-form", "Chatbot", "Virtual"],
      blockedPurposes: ["Political", "Adult", "Violence", "Religious", "Finance"],
      allowedRegions: ["Japan", "Korea"],
      blockedRegions: ["Global"],
      allowedChannels: ["YouTube", "Twitch", "TikTok", "Gaming Platform"],
      maxTermDays: 120, derivativeAllowed: "no",
      voiceCloneAllowed: true, faceSwapAllowed: false,
      characterizationAllowed: true, version: 5,
    },
  },
  {
    id: "t6", name: "David Kwon", stageName: "David", initials: "DK",
    intro: "Trustworthy and calm AI persona for finance and education verticals.",
    nationality: "Korean", languages: ["Korean", "English"], ageRange: "40s",
    genderExpression: "Male",
    tags: ["Korean", "40s", "Trustworthy", "Finance", "Education"],
    moodTags: ["Calm", "Reassuring", "Knowledgeable"],
    styleTags: ["Conservative", "Professional", "Mature"],
    voiceTags: ["Resonant", "Deep", "Steady"],
    rating: 4.5, reviewCount: 15, startingPrice: 1100, currency: "USD",
    avgApprovalHours: 36, verified: true, available: true,
    profileCompleteness: 70, profileViews: 98,
    assets: [
      { id: "a13", type: "face", label: "Face Image Set", status: "active", quality: "A", fileCount: 12 },
      { id: "a14", type: "voice", label: "Voice Clone", status: "active", quality: "B+", fileCount: 4 },
    ],
    consentPolicy: {
      id: "cp6", allowedPurposes: ["Finance", "Educational", "Corporate"],
      blockedPurposes: ["Political", "Adult", "Violence", "Entertainment", "Gaming"],
      allowedRegions: ["Korea", "Global"],
      blockedRegions: [],
      allowedChannels: ["Website", "YouTube", "LinkedIn"],
      maxTermDays: 365, derivativeAllowed: "conditional",
      voiceCloneAllowed: true, faceSwapAllowed: false,
      characterizationAllowed: false, version: 1,
    },
  },
];

// ── Projects ──
// NOTE: "licensed" status removed from ProjectStatus — licensing is PEALMOR's domain
export const projects: CastingProject[] = [
  {
    id: "p1", clientId: "c1", title: "Summer Campaign 2026", brand: "LuxeBeauty",
    category: "Beauty", budgetRange: "$10K-15K", budget: 12000,
    productionType: "Commercial Ad", targetRegions: ["Korea", "Japan"],
    mediaChannels: ["YouTube", "Instagram"], campaignPeriod: "Jun-Aug 2026",
    scriptSummary: "A luxury beauty brand summer collection campaign featuring elegant AI talent for social media and video ads.",
    status: "casting", riskLevel: "low", actorCount: 3, createdAt: "2026-03-01",
    requests: [],
  },
  {
    id: "p2", clientId: "c1", title: "Brand Ambassador Video", brand: "TechFlow",
    category: "Technology", budgetRange: "$5K-8K", budget: 5500,
    productionType: "Product Demo", targetRegions: ["Global"],
    mediaChannels: ["YouTube", "Website"], campaignPeriod: "Apr 2026",
    scriptSummary: "Tech product demonstration video featuring a knowledgeable AI presenter.",
    status: "pending_approval", riskLevel: "medium", actorCount: 1, createdAt: "2026-02-28",
    requests: [],
  },
  {
    id: "p3", clientId: "c1", title: "Product Launch Intro", brand: "NovaSkin",
    category: "Beauty", budgetRange: "$7K-10K", budget: 8200,
    productionType: "Short-form", targetRegions: ["Korea", "Japan", "Southeast Asia"],
    mediaChannels: ["TikTok", "Instagram"], campaignPeriod: "Mar 2026",
    scriptSummary: "Short-form video series for skincare product launch across Asian markets.",
    status: "in_production", riskLevel: "low", actorCount: 2, createdAt: "2026-02-20",
    requests: [],
  },
  {
    id: "p4", clientId: "c1", title: "Holiday Short-form Series", brand: "LuxeBeauty",
    category: "Beauty", budgetRange: "$12K-18K", budget: 15000,
    productionType: "Short-form Series", targetRegions: ["Korea", "Japan", "Global"],
    mediaChannels: ["YouTube", "TikTok", "Instagram"], campaignPeriod: "Dec 2025 - Jan 2026",
    scriptSummary: "Holiday-themed short-form content series featuring multiple AI talents.",
    status: "completed", riskLevel: "low", actorCount: 4, createdAt: "2025-12-10",
    requests: [],
  },
];

// ── Casting Requests ──
// These are local to the casting platform. Once approved, they trigger PEALMOR UsageRequest → Approval → LicenseGrant flow.
export const castingRequests: CastingRequest[] = [
  {
    id: "r1", projectId: "p1", talentId: "t1", talentName: "Yuna Park",
    companyName: "LuxeBeauty Co.", projectTitle: "Summer Campaign 2026",
    requestedAssets: ["face", "voice"], requestedPurpose: "Commercial Ad",
    requestedChannels: ["YouTube", "Instagram"], requestedRegions: "Korea, Japan",
    proposedFee: 2400, proposedRevenueShare: "15%", requestedTermDays: 60,
    notes: "Looking for an elegant presence to represent our summer luxury collection.",
    status: "pending", riskLevel: "low", policyConflicts: [], createdAt: "2026-03-05",
  },
  {
    id: "r2", projectId: "p2", talentId: "t1", talentName: "Yuna Park",
    companyName: "TechFlow Inc.", projectTitle: "AI Product Demo",
    requestedAssets: ["face", "voice", "persona"], requestedPurpose: "Educational / Demo",
    requestedChannels: ["Website", "YouTube"], requestedRegions: "Global",
    proposedFee: 1800, proposedRevenueShare: "—", requestedTermDays: 90,
    notes: "Need a professional AI presenter for our product walkthrough video.",
    status: "pending", riskLevel: "medium",
    policyConflicts: ["Global region exceeds policy limit (KR, JP, SEA only)"],
    createdAt: "2026-03-04",
  },
  {
    id: "r3", projectId: "p3", talentId: "t3", talentName: "Mika Tanaka",
    companyName: "NovaSkin", projectTitle: "Product Launch Intro",
    requestedAssets: ["face", "voice"], requestedPurpose: "Short-form",
    requestedChannels: ["TikTok", "Instagram"], requestedRegions: "Japan, Korea",
    proposedFee: 1200, proposedRevenueShare: "10%", requestedTermDays: 30,
    notes: "Energetic short-form content for skincare launch targeting young audience.",
    status: "approved", riskLevel: "low", policyConflicts: [], createdAt: "2026-02-22",
    respondedAt: "2026-02-23", pealmorRequestRef: "PEALMOR-REQ-001",
  },
  {
    id: "r4", projectId: "p1", talentId: "t5", talentName: "Hana Ito",
    companyName: "LuxeBeauty Co.", projectTitle: "Summer Campaign 2026",
    requestedAssets: ["face", "voice", "avatar"], requestedPurpose: "Commercial Ad",
    requestedChannels: ["YouTube", "Instagram"], requestedRegions: "Japan",
    proposedFee: 2800, proposedRevenueShare: "12%", requestedTermDays: 60,
    notes: "Virtual/avatar version for interactive Instagram stories.",
    status: "pending", riskLevel: "low", policyConflicts: [], createdAt: "2026-03-06",
  },
];

// NOTE: Licenses have been removed from local mock data.
// License data must be fetched from PEALMOR via getLicenseStatus() in pealmorApi.ts

// ── Notifications ──
export const notifications: Notification[] = [
  { id: "n1", title: "New Casting Request", message: "LuxeBeauty submitted a casting request for Summer Campaign 2026", type: "request", read: false, createdAt: "2026-03-08 10:32", link: "/talent/approvals" },
  { id: "n2", title: "Request Approved", message: "Mika Tanaka approved your casting request for Product Launch Intro", type: "approval", read: false, createdAt: "2026-03-08 10:15", link: "/client/projects" },
  { id: "n3", title: "Policy Conflict", message: "TechFlow request has a region policy conflict", type: "warning", read: false, createdAt: "2026-03-08 09:48" },
  { id: "n4", title: "PEALMOR License Expiring", message: "Holiday Short-form Series license expires in 3 days", type: "warning", read: true, createdAt: "2026-03-07 16:00", link: "/client/licenses" },
  { id: "n5", title: "PEALMOR Settlement", message: "March settlement of $3,200 has been processed via PEALMOR", type: "settlement", read: true, createdAt: "2026-03-05 09:00" },
];

// ── Verification Cases ──
export const verificationCases: VerificationCase[] = [
  { id: "v1", userName: "Min-ji Song", userType: "talent", submittedAt: "2026-03-07", documents: ["ID Card", "Selfie Video", "Voice Sample"], status: "pending", notes: "", riskFlags: [] },
  { id: "v2", userName: "GreenLeaf Studios", userType: "company", submittedAt: "2026-03-06", documents: ["Business Registration", "Representative ID"], status: "pending", notes: "", riskFlags: ["New company (< 1 year)"] },
  { id: "v3", userName: "Takeshi Yamamoto", userType: "talent", submittedAt: "2026-03-06", documents: ["Passport", "Agency Letter", "Portfolio"], status: "pending", notes: "", riskFlags: [] },
  { id: "v4", userName: "K-Star MCN", userType: "company", submittedAt: "2026-03-05", documents: ["Business Registration", "Tax Certificate", "Representative ID"], status: "pending", notes: "", riskFlags: [] },
  { id: "v5", userName: "Jin-woo Park", userType: "talent", submittedAt: "2026-03-05", documents: ["ID Card", "Selfie Video"], status: "pending", notes: "Missing voice sample", riskFlags: ["Incomplete documents"] },
  { id: "v6", userName: "Aurora Digital", userType: "company", submittedAt: "2026-03-04", documents: ["Business Registration", "Representative ID", "Portfolio"], status: "pending", notes: "", riskFlags: ["Foreign entity"] },
  { id: "v7", userName: "Suspicious Account", userType: "talent", submittedAt: "2026-03-03", documents: ["Low-quality ID scan"], status: "pending", notes: "", riskFlags: ["Low quality documents", "Potential identity fraud", "VPN detected"] },
];

// ── Disputes ──
export const disputes: DisputeCase[] = [
  { id: "d1", title: "Unauthorized TikTok Usage", reporter: "Yuna Park", reported: "Unknown Creator", type: "unauthorized_use", status: "investigating", description: "AI-generated content using Yuna's face found on unlicensed TikTok account in Thailand.", createdAt: "2026-03-06", priority: "high" },
  { id: "d2", title: "Scope Violation — TV Broadcast", reporter: "System (Auto)", reported: "LuxeBeauty Co.", type: "scope_violation", status: "open", description: "Licensed content for YouTube/Instagram was detected on KBS TV broadcast.", createdAt: "2026-03-07", priority: "critical" },
  { id: "d3", title: "Settlement Amount Dispute", reporter: "Alex Chen", reported: "TechFlow Inc.", type: "settlement_dispute", status: "open", description: "Talent disputes the settlement calculation for Q1 2026 project.", createdAt: "2026-03-05", priority: "medium" },
];

// Helper to get talent by ID
export function getTalentById(id: string): TalentProfile | undefined {
  return talents.find(t => t.id === id);
}

export function getProjectById(id: string): CastingProject | undefined {
  return projects.find(p => p.id === id);
}

export function getRequestsForTalent(talentId: string): CastingRequest[] {
  return castingRequests.filter(r => r.talentId === talentId);
}

export function getRequestsForProject(projectId: string): CastingRequest[] {
  return castingRequests.filter(r => r.projectId === projectId);
}
