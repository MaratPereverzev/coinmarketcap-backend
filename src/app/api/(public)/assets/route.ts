import Assets from "@/models/assets";
import { dbConnect, getQueryParams } from "@/utils";
import type { IAsset, AssetsSearchType } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

const projections: string = "-_id -__v";
const supplementaryInfo: object = {
  timestamp: Math.floor(Date.now() / 1000),
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  await dbConnect();
  const searchParams: URLSearchParams = req.nextUrl.searchParams;

  const query: AssetsSearchType = getQueryParams(searchParams);

  const data: IAsset[] = await Assets.find(query, projections);
  return NextResponse.json({ data, ...supplementaryInfo });
}
