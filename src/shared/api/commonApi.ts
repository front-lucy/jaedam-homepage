// src/shared/api/commonApi.ts
import axios from "axios";
import { fetchData } from "./fetchData";

interface CommonApiProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: unknown;
}

// src/shared/api/commonApi.ts
export async function globalCommonApi<T>(
  props: CommonApiProps
): Promise<T | null> {
  const isServer = typeof window === "undefined";

  try {
    const { url, method, data } = props;

    console.log("🌐 요청 URL:", url);
    console.log("📦 요청 메서드:", method);
    console.log("📨 요청 데이터:", data);
    const response = isServer
      ? await fetchData<T>({
          url,
          method: method as "GET" | "POST" | "PUT" | "DELETE",
          data: data as Record<string, unknown> | undefined,
        })
      : (
          await axios.post("/api/commonApi", {
            url,
            method,
            data, // 여기서 `params`로 바꾸지 마세요!
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
