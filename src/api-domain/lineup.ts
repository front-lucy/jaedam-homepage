// v1/jaedam/homepage/lineup

// import { globalCommonApi } from "@/shared/api/commonApi";
import { ApiWrapped } from "@/types/api";
import { LineUpResponse } from "@/types/lineup";
import mockLineupResponse from "../../mock-lineup.json";

export async function getLineup (): Promise<ApiWrapped<LineUpResponse>> {
  // return await globalCommonApi<ApiWrapped<LineUpResponse>>({
  //   url: `lineup`,
  //   method: "GET",
  // })

  return new Promise((resolve) => {
    resolve(mockLineupResponse);
  })
}