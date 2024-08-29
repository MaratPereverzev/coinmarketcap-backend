import type { IRate } from "@/utils/types";
import Rates from "@/models/rates";
import { dbConnect } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const supplementaryInfo: object = {
  timestamp: <number>Date.now(),
};
const projections: string = "-_id -__v";

export async function GET(req: NextRequest): Promise<NextResponse> {
  await dbConnect();

  //const data: IRate[] = await Rates.find({}, projections);
  return NextResponse.json({ data: "ok", ...supplementaryInfo });
}
