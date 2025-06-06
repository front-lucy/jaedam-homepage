// 탭 키 (카테고리 키) 타입 정의
export type TabKey =
  | "ALL"
  | "SNS"
  | "JAEDAM_NOTICE"
  | "PRESS_RELEASE"
  | "MEDIA_CONTENT";

// 탭 키에 해당하는 실제 출력 문자열 매핑
export const tabMap: Record<TabKey, string> = {
  ALL: "전체",
  JAEDAM_NOTICE: "재담 공지",
  PRESS_RELEASE: "보도 자료",
  MEDIA_CONTENT: "미디어 자료",
  SNS: "SNS",
};

// 뱃지는 TabKey 중 ALL을 제외한 값으로 제한
export type BadgeType = Exclude<TabKey, "ALL">;

// 뉴스 카드 Props 정의
export interface NewsCardProps {
  noticedAt: string; // YYYY.MM.DD 형식
  title: string;
  category: BadgeType;
  important: boolean;
  onClick?: () => void;
  className?: string;
}
