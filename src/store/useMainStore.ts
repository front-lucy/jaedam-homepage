import { FocusItem, HighlightItem } from '@/types/lineup';
import { create } from "zustand";

interface MainStore {
  focusList: FocusItem[];
  highlightList: HighlightItem[];

  setLineUpData: ({ focusList, highlightList }: { focusList: FocusItem[], highlightList: HighlightItem[] }) => void;

  hasData: boolean;
}

export const useMainStore = create<MainStore>((set, get) => ({
  focusList: [],
  highlightList: [],

  setLineUpData: ({ focusList, highlightList }) => {
    set({
      focusList: focusList.map(item => ({
        ...item,
        orderIndex: item.orderIndex || 0 // 기본값 설정
      })),
      highlightList: highlightList.map(item => ({
        ...item,
        orderIndex: item.orderIndex || 0 // 기본값 설정
      }))
    });
  },

  get hasData() {
    const state = get();
    return state.focusList.length > 0 || state.highlightList.length > 0;
  },
}));
