import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/utils";
import type { IAsset } from "@/utils/types";
import Assets from "@/models/assets";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  await dbConnect();
  const userData: IAsset = await req.json();

  let record: IAsset;
  try {
    record = await Assets.create({ ...userData, id: params.id });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  return NextResponse.json({
    message: "A record has been created",
    data: record,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  await dbConnect();
  const userData: IAsset = await req.json();

  try {
    await Assets.updateOne({ id: params.id }, { ...userData, id: params.id });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  return NextResponse.json({
    message: "The record has been updated",
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  await dbConnect();

  try {
    await Assets.deleteOne({ id: params.id });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  return NextResponse.json({
    message: "The record has been deleted",
  });
}
