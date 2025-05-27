// src/shared/api/fetchData.ts

export async function fetchData<T>({
  url,
  method,
  data,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: Record<string, unknown>;
}): Promise<{ success: boolean; body: T }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL 환경변수가 설정되지 않았습니다.");
  }

  try {
    const fullUrl =
      method === "GET" && data
        ? `${baseUrl}/${url}${buildQueryString(data)}`
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

    console.log("🌐 fetch 응답:", {
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries()),
      url: res.url,
    });

    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("❌ JSON 아님:", text);
      throw new Error("JSON 형식이 아님");
    }

    const json = await res.json();

    return {
      success: res.ok,
      body: json as T,
    };
  } catch (error) {
    console.error("❌ fetchData 요청 실패:", error);
    return {
      success: false,
      body: {} as T,
    };
  }
}

function buildQueryString(params: unknown): string {
  const query = new URLSearchParams(params as Record<string, string>);
  return `?${query.toString()}`;
}
