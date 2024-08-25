import Assets from "@/models/assets";
import type { IAsset, SearchParamsType } from "@/utils/types";
import { dbConnect, getQueryParams } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const projections: string = "-_id -__v";

export async function GET(req: NextRequest): Promise<NextResponse> {
  await dbConnect();
  const searchParams: URLSearchParams = req.nextUrl.searchParams;

  const query: SearchParamsType = getQueryParams(searchParams);

  const data: IAsset[] = await Assets.find(query, projections);
  return NextResponse.json({ data });
}
