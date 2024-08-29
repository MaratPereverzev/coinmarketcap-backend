import type { IMarket, MarketSearchType } from "@/utils/types";
import Markets from "@/models/markets";
import { dbConnect, getQueryParams } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const supplementaryInfo: object = {
  timestamp: <number>Date.now(),
};
const projections: string = "-_id -__v -volumePercent";

export async function GET(req: NextRequest): Promise<NextResponse> {
  await dbConnect();

  const searchParams: URLSearchParams = req.nextUrl.searchParams;
  const query: MarketSearchType =
    getQueryParams<MarketSearchType>(searchParams);

  const data: IMarket[] = await Markets.find(query, projections);
  return NextResponse.json({ data, ...supplementaryInfo });
}
