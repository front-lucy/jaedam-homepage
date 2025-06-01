// v1/jaedam/homepage/lineup

import { globalCommonApi } from "@/shared/api/commonApi";
import { ApiWrapped } from "@/types/api";
import { LineUpResponse } from "@/types/lineup";

export async function getLineup (): Promise<ApiWrapped<LineUpResponse>> {
  return await globalCommonApi<ApiWrapped<LineUpResponse>>({
    url: `lineup`,
    method: "GET",
  })
}