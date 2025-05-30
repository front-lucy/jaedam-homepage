export type ContentType =
  | "WEBTOON"
  | "WEBSOON"
  | "BOOK"
  | "GOODS"
  | "VIDEO"
  | "DIGITAL";

export const contentTypeLabels: Record<ContentType, string> = {
  WEBTOON: "웹툰",
  WEBSOON: "웹소설",
  BOOK: "북스",
  GOODS: "굿즈",
  VIDEO: "영화영상",
  DIGITAL: "디지털",
};

export const contentTypes: ContentType[] = [
  "WEBTOON",
  "WEBSOON",
  "BOOK",
  "GOODS",
  "VIDEO",
  "DIGITAL",
];

export interface SortObject {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableObject {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: SortObject;
}

export interface WorkContentItem {
  id: number;
  title: string;
  thumbnailUrl: string;
}

export interface PageContentHomeListResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  sort: SortObject;
  pageable: PageableObject;
  content: WorkContentItem[];
}

export interface WriterDto {
  id: number;
  name: string;
  nickname: string;
}

export interface PlatformDto {
  id: number;
  url: string;
  type: "NAVER" | "KAKAO";
}

export interface ContentHomeDetailResponse {
  id: number;
  title: string;
  synopsis: string;
  logline: string;
  thumbnailUrl: string;
  category: "NEW" | "ONGOING" | "COMPLETED" | "FEATURED";
  genre: string;
  tags: string[];
  writers: WriterDto[];
  platformList: PlatformDto[];
}
