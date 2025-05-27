import { globalCommonApi } from "@/shared/api/commonApi";
import { ContentType, PageContentHomeListResponse } from "@/types/workTypes";

interface GetContentsParams {
  type: ContentType;
  category?: string;
  genre?: string;
  page?: number;
  size?: number;
  sort?: string;
}

// 서버 응답이 { success: boolean; body: T } 구조라고 가정
type ApiWrapped<T> = {
  success: boolean;
  body: T;
};

export async function getContents({
  type,
  category = "",
  genre = "",
  page = 0,
  size = 20,
  sort = "",
}: GetContentsParams): Promise<PageContentHomeListResponse> {
  const res = await globalCommonApi<ApiWrapped<PageContentHomeListResponse>>({
    url: `contents/${type}`,
    method: "GET",
    data: {
      category,
      genre,
      page,
      size,
      sort,
    },
  });

  return res.body;
}
