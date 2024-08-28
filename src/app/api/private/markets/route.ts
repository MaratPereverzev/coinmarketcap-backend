import type { IMarket } from "@/utils";
import { Markets } from "@/models";
import { dbConnect, getQueryParams, RateSearchType } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const supplementaryInfo: object = {
  timestamp: <number>Date.now(),
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  await dbConnect();
  const userData: IMarket = await req.json();

  let data: IMarket;
  try {
    data = await Markets.create(userData);
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

  const userData: IMarket = await req.json();
  const searchParams: URLSearchParams = req.nextUrl.searchParams;
  const query: RateSearchType = getQueryParams<RateSearchType>(searchParams);

  try {
    if (query.baseId === undefined) throw new Error("id required");
    await Markets.updateOne(
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
  const query: RateSearchType = getQueryParams<RateSearchType>(searchParams);

  try {
    if (query.baseId === undefined) throw new Error("id required");
    await Markets.deleteOne({ id: query.baseId });
  } catch (err) {
    return NextResponse.json({ message: err, ...supplementaryInfo });
  }
  return NextResponse.json({
    message: "The record has been deleted",
    query,
    ...supplementaryInfo,
  });
}
