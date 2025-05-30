import { ContentType, WorkContentItem } from "@/types/workTypes";
import { create } from "zustand";

interface WorkStore {
  selectedTab: ContentType;
  selectedGenre: string;
  currentPage: number;
  items: WorkContentItem[];
  totalPages: number;
  scrollY: number;
  setSelectedTab: (tab: ContentType) => void;
  setSelectedGenre: (genre: string) => void;
  setCurrentPage: (page: number) => void;
  setItems: (items: WorkContentItem[]) => void;
  setTotalPages: (total: number) => void;
  setScrollY: (y: number) => void;
  reset: () => void;
}

export const useWorkStore = create<WorkStore>((set) => ({
  selectedTab: "WEBTOON",
  selectedGenre: "",
  currentPage: 0,
  items: [],
  totalPages: 0,
  scrollY: 0,
  setSelectedTab: (tab) => set({ selectedTab: tab, currentPage: 0 }),
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setItems: (items) => set({ items }),
  setTotalPages: (total) => set({ totalPages: total }),
  setScrollY: (y) => set({ scrollY: y }),
  reset: () =>
    set({
      selectedTab: "WEBTOON",
      selectedGenre: "",
      currentPage: 0,
      items: [],
      totalPages: 0,
      scrollY: 0,
    }),
}));
