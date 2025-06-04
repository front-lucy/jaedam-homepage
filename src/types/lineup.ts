export type FocusItem = {
  contentId: number;
  title: string;
  subTitle: string;
  synopsis: string;
  backgroundUrl: string;
  mobileBackgroundUrl: string;
  orderIndex: number;
  tags?: string[];
  writerNames: string[];
};

export type HighlightItem = {
  contentId: number;
  thumbnailUrl: string;
  orderIndex: number;
  title: string;
  writerName?: string[];
};

export type LineUpResponse = {
  focusList: FocusItem[];
  highlightList: HighlightItem[];
};
