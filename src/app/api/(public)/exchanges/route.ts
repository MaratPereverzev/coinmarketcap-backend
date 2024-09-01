import type { IExchange } from "@/utils/types";
import Exchanges from "@/models/exchanges";
import { dbConnect } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const supplementaryInfo: object = {
  timestamp: <number>Date.now(),
};
const projections: string = "-_id -__v";

export async function GET(req: NextRequest): Promise<NextResponse> {
  await dbConnect();

  const data: IExchange[] = await Exchanges.find({}, projections);
  return NextResponse.json({ data: "ok", ...supplementaryInfo });
}
