import { fetchData } from "@/shared/api/fetchData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, method, data } = await req.json();
    const response = await fetchData({ url, method, data });
    return NextResponse.json(response);
  } catch (err) {
    console.error("commonApi 에러:", err);
    return NextResponse.json(
      { success: false, message: "API 요청 실패" },
      { status: 500 }
    );
  }
}
