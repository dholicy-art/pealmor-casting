import { create } from "zustand";

interface ViewModeState {
  viewAsNormalUser: boolean;
  toggleViewMode: () => void;
}

export const useViewModeStore = create<ViewModeState>((set) => ({
  viewAsNormalUser: false,
  toggleViewMode: () => set((s) => ({ viewAsNormalUser: !s.viewAsNormalUser })),
}));
