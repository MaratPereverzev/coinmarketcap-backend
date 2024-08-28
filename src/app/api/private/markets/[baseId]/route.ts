import { Markets } from "@/models";
import type { IMarket } from "@/utils";
import { dbConnect } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const supplementaryInfo: object = {
  timestamp: <number>Date.now(),
};

export async function POST(
  req: NextRequest,
  { params }: { params: { baseId: string } }
): Promise<NextResponse> {
  await dbConnect();
  const userData: IMarket = await req.json();

  let data: IMarket;
  try {
    if (params.baseId === undefined) throw new Error("id required");
    data = await Markets.create({ ...userData, baseId: params.baseId });
  } catch (err) {
    return NextResponse.json({ message: err, ...supplementaryInfo });
  }
  return NextResponse.json({
    message: "A record has been created",
    data,
    ...supplementaryInfo,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { baseId: string } }
): Promise<NextResponse> {
  await dbConnect();

  const userData: IMarket = await req.json();

  try {
    if (params.baseId === undefined) throw new Error("id required");
    await Markets.updateOne(
      { id: params.baseId },
      { ...userData, baseId: params.baseId }
    );
  } catch (err) {
    return NextResponse.json({ message: err, ...supplementaryInfo });
  }
  return NextResponse.json({
    message: "The record has been updated",
    ...supplementaryInfo,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { baseId: string } }
): Promise<NextResponse> {
  await dbConnect();

  try {
    if (params.baseId === undefined) throw new Error("id required");
    await Markets.deleteOne({ baseId: params.baseId });
  } catch (err) {
    return NextResponse.json({ message: err, ...supplementaryInfo });
  }
  return NextResponse.json({
    message: "The record has been deleted",
    ...supplementaryInfo,
  });
}
