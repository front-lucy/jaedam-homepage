import { globalCommonApi } from '@/shared/api/commonApi';

interface GetNoticeListParams {
  category: 'SNS' | 'JAEDAM_NOTICE' | 'PRESS_RELEASE' | 'MEDIA_CONTENT' | 'LINK_RESOURCE';
  page: number;
  size: number;
  sort: string;
}

type ApiWrapped<T> = {
  success: boolean;
  body: T;
};

interface SortObject {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

interface PageableObject {
  offset: number;
  sort: SortObject[];
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface NoticeHomeListResponse {
  id: number;
  important: boolean;
  category: 'SNS' | 'JAEDAM_NOTICE' | 'PRESS_RELEASE' | 'MEDIA_CONTENT' | 'LINK_RESOURCE';
  title: string;
  noticedAt: string;
}

interface PageNoticeHomeListResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: NoticeHomeListResponse[];
  number: number;
  sort: SortObject[];
  first: boolean;
  last: boolean;
  pageable: PageableObject;
  numberOfElements: number;
  empty: boolean;
}

interface FileResponse {
  description?: string;
  url: string;
  originalName: string;
}

export interface NoticeHomeDetailResponse {
  id: number;
  category: 'SNS' | 'JAEDAM_NOTICE' | 'PRESS_RELEASE' | 'MEDIA_CONTENT' | 'LINK_RESOURCE';
  title: string;
  content: string;
  fileList: FileResponse[];
  noticedAt: string;
}

// /v1/jaedam/homepage/notice
export async function getNoticeList({
  category,
  page,
  size,
  sort,
}: GetNoticeListParams): Promise<ApiWrapped<PageNoticeHomeListResponse>> {
  const res = await globalCommonApi<ApiWrapped<PageNoticeHomeListResponse>>({
    url: `notice?category=${category}&page=${page}&size=${size}&sort=${sort}`,
    method: 'GET',
    data: {},
  });
  return res;
}

// /v1/jaedam/homepage/notice/{id}
export async function getNoticeDetail(id: number): Promise<ApiWrapped<NoticeHomeDetailResponse>> {
  const res = await globalCommonApi<ApiWrapped<NoticeHomeDetailResponse>>({
    url: `notice/${id}`,
    method: 'GET',
    data: {},
  });
  return res;
}

// /v1/jaedam/homepage/notice/main 재담 홈페이지 메인 페이지 뉴스 조회
export async function getMainNoticeList(): Promise<ApiWrapped<NoticeHomeListResponse[]>> {
  const res = await globalCommonApi<ApiWrapped<NoticeHomeListResponse[]>>({
    url: `notice/main`,
    method: 'GET',
    data: {},
  });
  return res;
}
