export type Language = 'ko' | 'ja' | 'zh' | 'fr' | 'en' | 'es' | 'de' | 'pt' | 'ar' | 'vi';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ko', label: 'Korean', nativeLabel: '한국어', flag: '🇰🇷' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: 'Chinese', nativeLabel: '中文', flag: '🇨🇳' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português', flag: '🇧🇷' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', flag: '🇸🇦' },
  { code: 'vi', label: 'Vietnamese', nativeLabel: 'Tiếng Việt', flag: '🇻🇳' },
];

export interface Translations {
  // Common
  common: {
    settings: string;
    language: string;
    languageSettings: string;
    languageDescription: string;
    save: string;
    cancel: string;
    back: string;
    viewAll: string;
    search: string;
    filters: string;
    all: string;
    pending: string;
    approved: string;
    rejected: string;
    active: string;
    expired: string;
    loading: string;
    noResults: string;
    confirm: string;
    delete: string;
    edit: string;
    create: string;
    submit: string;
    close: string;
    yes: string;
    no: string;
    appearance: string;
    notifications: string;
    general: string;
    account: string;
    themeDescription: string;
    darkMode: string;
    lightMode: string;
  };

  // Landing
  landing: {
    title: string;
    subtitle: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDesc: string;
    startCasting: string;
    registerTalent: string;
    features: string;
    howItWorks: string;
    portals: string;
    aiActors: string;
    projects: string;
    compliance: string;
    avgApproval: string;
    trustTitle1: string;
    trustTitle2: string;
    trustDesc: string;
    choosePortal: string;
    clientPortal: string;
    clientPortalDesc: string;
    talentPortal: string;
    talentPortalDesc: string;
    adminPortal: string;
    adminPortalDesc: string;
    enter: string;
    copyright: string;
    poweredBy: string;
    featureRights: string;
    featureRightsDesc: string;
    featureDiscovery: string;
    featureDiscoveryDesc: string;
    featureApproval: string;
    featureApprovalDesc: string;
    featureRevenue: string;
    featureRevenueDesc: string;
    featureMultiPortal: string;
    featureMultiPortalDesc: string;
    featureConnected: string;
    featureConnectedDesc: string;
  };

  // Client
  client: {
    dashboard: string;
    searchActors: string;
    compare: string;
    licenses: string;
    projects: string;
    bookmarks: string;
    welcomeBack: string;
    manageProjects: string;
    findAIActors: string;
    activeProjects: string;
    pendingApprovals: string;
    bookmarked: string;
    activeLicenses: string;
    recentlyViewed: string;
    browseAll: string;
    castingRequest: string;
    sendRequest: string;
    project: string;
    purpose: string;
    requestedAssets: string;
    channels: string;
    targetRegions: string;
    termDays: string;
    proposedFee: string;
    revenueShare: string;
    additionalNotes: string;
    submitCasting: string;
    policyWarnings: string;
    newProject: string;
    totalProjects: string;
    brand: string;
    status: string;
    requests: string;
    budget: string;
    period: string;
    compareActors: string;
    actorsSelected: string;
    clearAll: string;
    rating: string;
    mood: string;
    voice: string;
    startingPrice: string;
    avgApprovalTime: string;
    languages: string;
    regions: string;
    maxTerm: string;
    derivativeWorks: string;
    blockedPurposes: string;
    cast: string;
    assets: string;
    expiringSoon: string;
    grantedScope: string;
    fee: string;
    noActorsCompare: string;
    findActors: string;
    searchPlaceholder: string;
    gender: string;
    regionAvailability: string;
    actorsFound: string;
    overview: string;
    samples: string;
    persona: string;
    usagePolicy: string;
    reviews: string;
    about: string;
    nationality: string;
    ageRange: string;
    availableAssets: string;
    pricing: string;
    startingPricePerProject: string;
    voiceClone: string;
    faceSwap: string;
    allowedPurposes: string;
    allowedRegions: string;
    allowedChannels: string;
    addToCompare: string;
    inCompareList: string;
    requestCasting: string;
    verified: string;
    available: string;
    unavailable: string;
    backToSearch: string;
    // Network & PEALMOR
    actorNetwork: string;
    teams: string;
    universes: string;
    aiAudition: string;
    autoCast: string;
    pealmorLicenses: string;
    readOnlyView: string;
    revenueDashboard: string;
    script: string;
    performanceType: string;
    emotionTones: string;
    selectActors: string;
    generateAudition: string;
    generatingPerformances: string;
    auditionResults: string;
    performances: string;
    bestScore: string;
    recommendedCast: string;
    scriptDescription: string;
    analyzingScript: string;
    autoCastButton: string;
    actorGraph: string;
    totalActors: string;
    connections: string;
    avgStrength: string;
    relationshipTypes: string;
    castTeam: string;
    voicePerformance: string;
    faceActing: string;
    fullPerformance: string;
    pealmorSettlement: string;
    pealmorPayment: string;
    settlementHistory: string;
    settlementDetails: string;
    paymentStatus: string;
    paidSettlements: string;
  };

  // Talent
  talent: {
    dashboard: string;
    profile: string;
    approvals: string;
    earnings: string;
    welcomeBack: string;
    yourDashboard: string;
    pendingRequests: string;
    profileViews: string;
    thisMonth: string;
    policyAlerts: string;
    earningsOverview: string;
    recentRequests: string;
    profileCompleteness: string;
    addVoiceSamples: string;
    profileComplete: string;
    approvalCenter: string;
    totalRequests: string;
    approve: string;
    reject: string;
    counterOffer: string;
    counterOfferConditions: string;
    sendCounterOffer: string;
    policyConflict: string;
    risk: string;
    term: string;
    region: string;
    myProfile: string;
    manageProfile: string;
    editProfile: string;
    aiAssets: string;
    consentPolicy: string;
    editPolicy: string;
    quality: string;
    files: string;
    totalEarnings: string;
    availableWithdrawal: string;
    pendingSettlement: string;
    monthlyRevenue: string;
    projectEarnings: string;
    unread: string;
  };

  // Admin
  admin: {
    dashboard: string;
    overview: string;
    users: string;
    verification: string;
    requestReview: string;
    disputes: string;
    auditLogs: string;
    pendingVerifications: string;
    highRiskRequests: string;
    openDisputes: string;
    pendingSettlements: string;
    recentActivity: string;
    viewAllLogs: string;
    verificationQueue: string;
    selectCase: string;
    documents: string;
    riskFlags: string;
    notes: string;
    requestMoreInfo: string;
    disputeCenter: string;
    activeDisputes: string;
    startInvestigation: string;
    resolve: string;
    escalate: string;
    totalEntries: string;
    severity: string;
    user: string;
    role: string;
    action: string;
    target: string;
    time: string;
    allSeverity: string;
    allRoles: string;
    totalRequests: string;
    flagged: string;
    conflicts: string;
    forceApprove: string;
    forceReject: string;
  };

  // Toast messages
  toast: {
    requestApproved: string;
    requestRejected: string;
    counterOfferSent: string;
    enterConditions: string;
    castingRequestSent: string;
    bookmarkAdded: string;
    bookmarkRemoved: string;
    alreadyInCompare: string;
    maxCompare: string;
    addedToCompare: string;
    removedFromCompare: string;
    compareCleared: string;
    linkCopied: string;
    verificationApproved: string;
    verificationRejected: string;
    disputeStatusChanged: string;
    requestForceApproved: string;
    requestForceRejected: string;
    languageChanged: string;
  };
}
