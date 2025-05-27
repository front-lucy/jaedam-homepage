import { ContentType, WorkContentItem } from "@/types/workTypes";
import { create } from "zustand";

interface WorkStore {
  selectedTab: ContentType;
  currentPage: number;
  items: WorkContentItem[];
  totalPages: number;
  setSelectedTab: (tab: ContentType) => void;
  setCurrentPage: (page: number) => void;
  setItems: (items: WorkContentItem[]) => void;
  setTotalPages: (total: number) => void;
  reset: () => void;
}

export const useWorkStore = create<WorkStore>((set) => ({
  selectedTab: "WEBTOON",
  currentPage: 0,
  items: [],
  totalPages: 0,
  setSelectedTab: (tab) => set({ selectedTab: tab, currentPage: 0 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setItems: (items) => set({ items }),
  setTotalPages: (total) => set({ totalPages: total }),
  reset: () =>
    set({
      selectedTab: "WEBTOON",
      currentPage: 0,
      items: [],
      totalPages: 0,
    }),
}));
