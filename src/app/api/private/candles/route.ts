import Candles from "@/models/candles";
import type { ICandle, CandleSearchType } from "@/utils";
import { dbConnect, getQueryParams } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const supplementaryInfo: object = {
  timestamp: <number>Date.now(),
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  await dbConnect();
  const userData: CandleSearchType = await req.json();

  let data: ICandle;
  try {
    if (userData.baseId === undefined) throw new Error("id required");
    if (userData.quoteId === undefined) throw new Error("quoteId required");
    if (userData.interval === undefined) throw new Error("interval reuquired");
    if (userData.exchange === undefined) throw new Error("exchange required");
    data = await Candles.create(userData);
  } catch (err) {
    return NextResponse.json({ message: err, ...supplementaryInfo });
  }
  return NextResponse.json({
    message: "A record has been created",
    data,
    ...supplementaryInfo,
  });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  await dbConnect();

  const userData: ICandle = await req.json();
  const searchParams: URLSearchParams = req.nextUrl.searchParams;
  const query: CandleSearchType =
    getQueryParams<CandleSearchType>(searchParams);

  try {
    if (query.baseId === undefined) throw new Error("id required");
    await Candles.updateOne(
      { baseId: query.baseId },
      { ...userData, baseId: query.baseId }
    );
  } catch (err) {
    return NextResponse.json({ message: err, ...supplementaryInfo });
  }
  return NextResponse.json({
    message: "The record has been updated",
    ...supplementaryInfo,
  });
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  await dbConnect();

  const searchParams: URLSearchParams = req.nextUrl.searchParams;
  const query: CandleSearchType =
    getQueryParams<CandleSearchType>(searchParams);

  try {
    if (query.baseId === undefined) throw new Error("id required");
    await Candles.deleteOne({ baseId: query.baseId });
  } catch (err) {
    return NextResponse.json({ message: err, ...supplementaryInfo });
  }
  return NextResponse.json({
    message: "The record has been deleted",
    query,
    ...supplementaryInfo,
  });
}
