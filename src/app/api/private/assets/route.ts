import { Assets, Histories } from "@/models";
import type { IAsset, AssetsSearchType } from "@/utils/types";
import { dbConnect, getQueryParams, HistoryHandler } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const supplementaryInfo: object = {
  timestamp: Math.floor(Date.now() / 1000),
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  await dbConnect();
  const userData: IAsset = await req.json();

  let asset: IAsset;
  try {
    if (userData.id === undefined) throw new Error("Required id");

    asset = await Assets.create(userData);

    HistoryHandler.createRecord({
      id: userData.id,
      priceUsd: userData.priceUsd,
    });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  return NextResponse.json(
    { message: "A record has been created", data: asset, ...supplementaryInfo },
    { status: 200 }
  );
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  await dbConnect();
  const userData: IAsset = await req.json();
  const searchParams = req.nextUrl.searchParams;

  const query: { id?: string } = getQueryParams<AssetsSearchType>(searchParams);

  try {
    if (query.id === undefined) throw new Error("Requires id");

    await Assets.updateOne({ id: query.id }, userData);

    HistoryHandler.createRecord({ id: query.id, priceUsd: userData.priceUsd });
  } catch (err) {
    return NextResponse.json(
      { message: err, ...supplementaryInfo },
      { status: 400 }
    );
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
    return NextResponse.json(
      { message: err, ...supplementaryInfo },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: "The record has been deleted",
      ...supplementaryInfo,
    },
    { status: 200 }
  );
}
