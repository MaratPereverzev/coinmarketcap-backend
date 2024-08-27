import Histories from "@/models/history";

abstract class HistoryHandler {
  public static async createRecord(data: { id: string; priceUsd: string }) {
    const date = Date.now();

    await Histories.create({
      id: data.id,
      priceUsd: data.priceUsd,
      timestamp: Math.floor(date / 60000) * 60000,
      date: new Date(Math.floor(date / 60000) * 60000),
    });
  }
}

export { HistoryHandler };
