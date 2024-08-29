import { NextRequest, NextResponse } from "next/server";
import Candles from "@/models/candles";
import type { ICandle, CandleSearchType } from "@/utils/types";
import { dbConnect, getQueryParams } from "@/utils";

const projections: string = "-__v -_id";
const supplementaryInfo: object = {
  timestamps: <number>Date.now(),
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  await dbConnect();

  const searchParams: URLSearchParams = req.nextUrl.searchParams;
  const query = getQueryParams<CandleSearchType>(searchParams);

  const data: ICandle[] = await Candles.find(query);
  return NextResponse.json({ data, ...supplementaryInfo });
}
