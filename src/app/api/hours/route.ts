import { NextResponse } from "next/server";
import { readHoursSettings } from "@/lib/hoursStore";

/** Public hours — times only. No open/closed status on the customer website. */
export async function GET() {
  const settings = await readHoursSettings();

  return NextResponse.json({
    openTime: settings.openTime,
    closeTime: settings.closeTime,
    sellingToday: settings.sellingToday,
    updatedAt: settings.updatedAt,
  });
}
