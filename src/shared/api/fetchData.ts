import { Method } from "axios";

interface FetchDataProps {
  url: string;
  method: Method;
  data?: unknown;
}

interface ApiResponse<T> {
  success: boolean;
  body: T;
}

export async function fetchData<T>({
  url,
  method,
  data,
}: FetchDataProps): Promise<ApiResponse<T>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL 환경변수가 설정되지 않았습니다.");
  }

  const fullUrl = `${baseUrl}/${url}`;

  try {
    const isGet = method === "GET";

    const res = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(isGet ? {} : { body: JSON.stringify(data) }),
      cache: "no-store",
    });

    const json = await res.json();

    return {
      success: res.ok,
      body: json.body,
    };
  } catch (error) {
    console.error("❌ fetchData 요청 실패:", error);
    return {
      success: false,
      body: {} as T,
    };
  }
}
