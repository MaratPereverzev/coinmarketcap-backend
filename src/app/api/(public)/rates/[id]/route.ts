import type { IRate } from "@/utils";
import { Rates } from "@/models";
import { dbConnect } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const supplementaryInfo: object = {
  timestamp: <number>Date.now(),
};
const projections: string = "-_id -__v";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  await dbConnect();

  let data: IRate | null;
  try {
    data = await Rates.findOne({ id: params.id }, projections);
  } catch (err) {
    return NextResponse.json({ message: err, ...supplementaryInfo });
  }
  return NextResponse.json({ data, ...supplementaryInfo });
}
