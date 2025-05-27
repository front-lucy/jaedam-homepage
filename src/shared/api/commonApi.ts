// src/shared/api/commonApi.ts
import axios from "axios";

interface IglobalCommonApiProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: unknown;
}

function buildQueryString(params: Record<string, unknown>): string {
  const stringParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );
  const query = new URLSearchParams(stringParams).toString();
  return `?${query}`;
}

export async function globalCommonApi<T>(
  props: IglobalCommonApiProps
): Promise<T> {
  const isServer = typeof window === "undefined";

  try {
    const data: T = isServer
      ? await serverFetch<T>(props)
      : (await axios.post("/api/commonApi", props)).data;

    return data;
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    throw error;
  }
}

async function serverFetch<T>({
  url,
  method,
  data,
}: IglobalCommonApiProps): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_BASE_URL 환경변수 누락");

  const fullUrl =
    method === "GET" && data
      ? `${baseUrl}/${url.replace(/\/+/g, "/")}${buildQueryString(
          data as Record<string, unknown>
        )}`
      : `${baseUrl}/${url.replace(/\/+/g, "/")}`;

  const res = await fetch(fullUrl, {
    method,
    ...(method !== "GET"
      ? {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      : {}),
  });

  const contentType = res.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    console.error("❌ JSON 형식 아님 응답:", {
      status: res.status,
      text,
    });
    throw new Error("JSON 형식이 아닌 응답");
  }

  const json = await res.json();
  return json; // ✅ 가공 없이 그대로 반환
}
