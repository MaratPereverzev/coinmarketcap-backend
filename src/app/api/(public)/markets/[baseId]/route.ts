import { Markets } from "@/models";
import type { IMarket } from "@/utils";
import { dbConnect } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const supplementaryInfo: object = {
  timestamp: <number>Date.now(),
};
const projections: string = "-_id -__v -volumePercent";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  await dbConnect();

  let data: IMarket | null;
  try {
    data = await Markets.findOne({ baseId: params.id }, projections);
  } catch (err) {
    return NextResponse.json({ message: err, ...supplementaryInfo });
  }
  return NextResponse.json({ data, ...supplementaryInfo });
}
