import type { IRate } from "@/utils";
import { Rates } from "@/models";
import { dbConnect, getQueryParams, RateSearchType } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const supplementaryInfo: object = {
  timestamp: <number>Date.now(),
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  await dbConnect();
  const userData: IRate = await req.json();

  let data: IRate;
  try {
    if (userData.id === undefined) throw new Error("id required");
    data = await Rates.create(userData);
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

  const userData: IRate = await req.json();
  const searchParams: URLSearchParams = req.nextUrl.searchParams;
  const query: RateSearchType = getQueryParams<RateSearchType>(searchParams);

  try {
    if (query.id === undefined) throw new Error("id required");
    await Rates.updateOne({ id: query.id }, { ...userData, id: query.id });
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
    if (query.id === undefined) throw new Error("id required");
    await Rates.deleteOne({ id: query.id });
  } catch (err) {
    return NextResponse.json({ message: err, ...supplementaryInfo });
  }
  return NextResponse.json({
    message: "The record has been deleted",
    query,
    ...supplementaryInfo,
  });
}
