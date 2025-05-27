// src/app/api/commonApi/route.ts

import { globalCommonApi } from "@/shared/api/commonApi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, method, data } = await req.json();
    const response = await globalCommonApi({ url, method, data });
    return NextResponse.json(response);
  } catch (err) {
    console.error("commonApi 에러:", err);
    return NextResponse.json(
      {
        success: false,
        body: {
          status: "error",
          code: "route_error",
          message: "API 요청 실패",
        },
      },
      { status: 500 }
    );
  }
}
