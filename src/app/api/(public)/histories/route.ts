import Histories from "@/models/history";
import { dbConnect, getQueryParams } from "@/utils";
import { HistorySearchType, IHistory, timestampsValues } from "@/utils/types";

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
  const searchParams: URLSearchParams = req.nextUrl.searchParams;

  const query: HistorySearchType =
    getQueryParams<HistorySearchType>(searchParams);

  let data: IHistory[];

  try {
    if (!query.interval) throw new Error("interval required");
    if (timestampsValues[query.interval] === undefined)
      throw new Error(
        "doesn't match interval values: m1, m5, m15, m30, h1, h2, h6, h12, d1"
      );
    if (!query.start && query.end) throw new Error("start required");
    if (query.start && !query.end) throw new Error("end required");

    if (query.id === undefined) throw new Error("token id required");
    data = await Histories.find({ id: query?.id }, projections);

    data = data.filter((record: IHistory) => {
      let isReturned = true;
      if (query.start !== undefined)
        isReturned =
          query.start <= record.timestamp && query.end! <= record.timestamp;
      if (record.timestamp % timestampsValues[query.interval] !== 0)
        isReturned = false;

      return isReturned;
    });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  return NextResponse.json({
    data,
    ...supplementaryInfo,
  });
}
