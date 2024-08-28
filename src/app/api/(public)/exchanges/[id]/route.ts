import { Exchanges } from "@/models";
import type { IExchange } from "@/utils";
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

  let data: IExchange | null;
  try {
    data = await Exchanges.findOne({ id: params.id }, projections);
  } catch (err) {
    return NextResponse.json({ message: err, ...supplementaryInfo });
  }
  return NextResponse.json({ data, ...supplementaryInfo });
}
