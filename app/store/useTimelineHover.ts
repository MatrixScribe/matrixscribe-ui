"use client";

import { create } from "zustand";

interface TimelineHoverState {
  hoverDate: string | null;
  setHoverDate: (date: string | null) => void;
}

export const useTimelineHover = create<TimelineHoverState>((set) => ({
  hoverDate: null,
  setHoverDate: (date) => set({ hoverDate: date }),
}));
