import Assets from "@/models/assets";
import type { IAsset, SearchParamsType } from "@/utils/types";
import { dbConnect, getQueryParams } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  await dbConnect();
  const searchParams: URLSearchParams = req.nextUrl.searchParams;

  const query: SearchParamsType = getQueryParams(searchParams);

  const data: IAsset[] = await Assets.find(query);
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  await dbConnect();
  const userData: IAsset = await req.json();

  let asset: IAsset;
  try {
    asset = await Assets.create(userData);
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  return NextResponse.json(
    { message: "A record has been created", data: asset },
    { status: 200 }
  );
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  await dbConnect();
  const userData: IAsset = await req.json();
  const searchParams = req.nextUrl.searchParams;

  const query: { id: string | undefined } = getQueryParams(searchParams);

  try {
    if (query.id === undefined) throw new Error("requires id prop");
    await Assets.updateOne({ id: query.id }, userData);
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  return NextResponse.json(
    { message: "The rocord has been updated" },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  await dbConnect();
  const searchParams = req.nextUrl.searchParams;

  const query: { id: string | undefined } = getQueryParams(searchParams);

  try {
    if (query.id === undefined) throw new Error("requires id prop");
    await Assets.deleteOne({ id: query.id });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  return NextResponse.json(
    {
      message: "The record has been deleted",
    },
    { status: 200 }
  );
}
