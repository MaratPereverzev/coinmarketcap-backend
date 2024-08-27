import { Rates } from "@/models";
import type { IRate } from "@/utils";
import { dbConnect } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const supplementaryInfo: object = {
  timestamp: <number>Date.now(),
};

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  await dbConnect();
  const userData: IRate = await req.json();

  let data: IRate;
  try {
    if (params.id === undefined) throw new Error("id required");
    data = await Rates.create({ ...userData, id: params.id });
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
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  await dbConnect();

  const userData: IRate = await req.json();

  try {
    if (params.id === undefined) throw new Error("id required");
    await Rates.updateOne({ id: params.id }, { ...userData, id: params.id });
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
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  await dbConnect();

  try {
    if (params.id === undefined) throw new Error("id required");
    await Rates.deleteOne({ id: params.id });
  } catch (err) {
    return NextResponse.json({ message: err, ...supplementaryInfo });
  }
  return NextResponse.json({
    message: "The record has been deleted",
    ...supplementaryInfo,
  });
}
