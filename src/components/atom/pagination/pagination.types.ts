export interface PaginationProps {
  current: number; // 현재 페이지
  total: number; // 전체 페이지 수
  onChange: (page: number) => void; // 페이지 변경 함수
  maxVisible?: number; // 화면에 보여질 최대 페이지 수 (기본 5)
}
