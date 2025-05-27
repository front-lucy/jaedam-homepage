// src/shared/api/commonApi.ts
import axios from "axios";
import { fetchData } from "./fetchData";

interface CommonApiProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: unknown;
}

export async function globalCommonApi<T>(
  props: CommonApiProps
): Promise<T | null> {
  const isServer = typeof window === "undefined";

  try {
    const { url, method, data } = props;

    const response = isServer
      ? await fetchData<T>(props)
      : (
          await axios({
            url: `/api/commonApi`,
            method: "POST",
            data: {
              url,
              method,
              ...(method === "GET" ? { params: data } : { data }),
            },
          })
        ).data;

    return response.success ? response.body : null;
  } catch (e) {
    if (!isServer) {
      alert(
        `요청 중 오류가 발생했습니다. ${e instanceof Error ? e.message : ""}`
      );
    }
    return null;
  }
}
