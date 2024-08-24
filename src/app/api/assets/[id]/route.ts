import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/utils";
import Assets from "@/models/assets";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const id = params.id;
  await dbConnect();

  const data: object | null = await Assets.findOne({ id }).select("-_id");
  return NextResponse.json({ data });
}
