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
  category = "",
  genre = "",
  page = 0,
  size = 20,
  sort = "",
}: GetContentsParams): Promise<PageContentHomeListResponse | null> {
  const response = await globalCommonApi<PageContentHomeListResponse>({
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

  return response.success ? response.body : null;
}
