import Markets from "@/models/markets";
import { dbConnect, getQueryParams } from "@/utils";
import type { IMarket, MarketSearchType } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

const supplementaryInfo: object = {
  timestamp: <number>Date.now(),
};
const projections = "-__v -_id -rank -priceQuote";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  await dbConnect();

  const searchParams: URLSearchParams = req.nextUrl.searchParams;
  const query: { limit: number; offset: number } =
    getQueryParams<MarketSearchType>(searchParams);

  const data: IMarket[] = await Markets.find(
    { baseId: params.id, ...query },
    projections
  );
  return NextResponse.json({ data, ...supplementaryInfo });
}
