import Assets from "@/models/assets";
import { dbConnect } from "@/utils";
import type { IAsset } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

const projections: string = "-_id -__v";
const supplementaryInfo: object = {
  timestamp: <number>Date.now(),
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  await dbConnect();

  const data: IAsset | null = await Assets.findOne(
    { id: params.id },
    projections
  );
  return NextResponse.json({ data, ...supplementaryInfo });
}
