import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/utils";
import type { IAsset } from "@/utils/types";
import Assets from "@/models/assets";

const projections: string = "-_id -__v";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  await dbConnect();

  const data: IAsset | null = await Assets.findOne(
    { id: params.id },
    projections
  );
  return NextResponse.json({ data });
}
