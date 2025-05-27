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

export async function getContents({
  type,
  category = "NEW",
  genre = "ACTION",
  page = 0,
  size = 20,
  sort = "",
}: GetContentsParams): Promise<PageContentHomeListResponse | null> {
  return await globalCommonApi({
    url: `/contents/${type}?category=${category}&genre=${genre}&page=${page}&size=${size}&sort=${sort}`,
    method: "GET",
  });
}
