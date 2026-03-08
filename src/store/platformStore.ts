import { create } from "zustand";
import type { CastingRequest, Notification } from "@/types/platform";
import { castingRequests as initialRequests, notifications as initialNotifications } from "@/data/mockData";

interface PlatformStore {
  // Bookmarks
  bookmarkedTalents: string[];
  toggleBookmark: (talentId: string) => void;

  // Compare
  compareTalents: string[];
  addToCompare: (talentId: string) => void;
  removeFromCompare: (talentId: string) => void;
  clearCompare: () => void;

  // Casting Requests
  requests: CastingRequest[];
  updateRequestStatus: (requestId: string, status: CastingRequest["status"], counterNotes?: string) => void;
  addRequest: (request: CastingRequest) => void;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  addNotification: (notification: Notification) => void;
  unreadCount: () => number;
}

export const usePlatformStore = create<PlatformStore>((set, get) => ({
  bookmarkedTalents: [],
  toggleBookmark: (talentId) =>
    set((s) => ({
      bookmarkedTalents: s.bookmarkedTalents.includes(talentId)
        ? s.bookmarkedTalents.filter((id) => id !== talentId)
        : [...s.bookmarkedTalents, talentId],
    })),

  compareTalents: ["t1", "t3", "t5"],
  addToCompare: (talentId) =>
    set((s) => {
      if (s.compareTalents.length >= 4 || s.compareTalents.includes(talentId)) return s;
      return { compareTalents: [...s.compareTalents, talentId] };
    }),
  removeFromCompare: (talentId) =>
    set((s) => ({ compareTalents: s.compareTalents.filter((id) => id !== talentId) })),
  clearCompare: () => set({ compareTalents: [] }),

  requests: initialRequests,
  updateRequestStatus: (requestId, status, counterNotes) =>
    set((s) => ({
      requests: s.requests.map((r) =>
        r.id === requestId
          ? { ...r, status, respondedAt: new Date().toISOString().slice(0, 10), counterOfferNotes: counterNotes }
          : r
      ),
    })),
  addRequest: (request) => set((s) => ({ requests: [...s.requests, request] })),

  notifications: initialNotifications,
  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  addNotification: (notification) =>
    set((s) => ({ notifications: [notification, ...s.notifications] })),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
