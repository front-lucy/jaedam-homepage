// src/shared/api/commonApi.ts
import { ICommonResponseType } from "@/types/response";
import axios from "axios";

interface IglobalCommonApiProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: unknown;
}

export async function globalCommonApi(
  props: IglobalCommonApiProps
): Promise<ICommonResponseType<unknown>> {
  const isServer = typeof window === "undefined";

  try {
    const apiData: ICommonResponseType<unknown> = isServer
      ? await serverFetch(props)
      : (await axios.post("/api/commonApi", props)).data;

    return apiData;
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    return {
      success: false,
      body: {
        status: "error",
        code: "error",
        message: "API 호출 중 오류 발생",
      },
    };
  }
}

async function serverFetch({
  url,
  method,
  data,
}: IglobalCommonApiProps): Promise<ICommonResponseType<unknown>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_BASE_URL 환경변수 누락");

  const fullUrl =
    method === "GET" && data
      ? `${baseUrl}/${url}${buildQueryString(data as Record<string, unknown>)}`
      : `${baseUrl}/${url}`;

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
    console.error("❌ JSON 형식 아님 응답:", text);
    throw new Error("JSON 형식이 아닌 응답");
  }

  const json = await res.json();
  return {
    success: res.ok,
    body: json,
  };
}

function buildQueryString(params: Record<string, unknown>): string {
  const stringParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );
  const query = new URLSearchParams(stringParams).toString();
  return `?${query}`;
}
