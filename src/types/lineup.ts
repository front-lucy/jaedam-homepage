export type FocusItem = {
  contentId: number;
  title: string;
  subTitle: string;
  synopsis: string;
  backgroundUrl: string;
  mobileBackgroundUrl: string;
  orderIndex: number;
  tags?: string[];
}

export type HighlightItem = {
  contentId: number;
  thumbnailUrl: string;
  orderIndex: number;
  title: string;
}

export type LineUpResponse = {
  focusList: FocusItem[];
  highlightList: HighlightItem[];
}