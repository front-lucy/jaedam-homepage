import { commonApi } from "@/shared/api/commonApi";
import { ContentType, PageContentHomeListResponse } from "@/types/workTypes";

export const loadContents = async (
  type: ContentType,
  page: number = 0
): Promise<PageContentHomeListResponse | null> => {
  const response = await commonApi<PageContentHomeListResponse>({
    url: `v1/jaedam/homepage/contents/${type}`,
    method: "GET",
    data: {
      category: "",
      genre: "",
      page,
      size: 20,
      sort: "",
    },
  });

  return response;
};
