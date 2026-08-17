import { NextResponse } from "next/server";
import { hoursMessages } from "@/config/business";
import { readHoursSettings } from "@/lib/hoursStore";
import { getShopStatusFromSettings } from "@/lib/shopHours";

export async function GET() {
  const settings = await readHoursSettings();
  const status = getShopStatusFromSettings(settings, hoursMessages);

  return NextResponse.json({
    ...settings,
    status,
  });
}
