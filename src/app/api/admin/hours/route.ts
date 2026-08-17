import { NextResponse } from "next/server";
import { hoursMessages } from "@/config/business";
import {
  getHoursStorageInfo,
  HoursStorageError,
  readHoursSettings,
  writeHoursSettings,
} from "@/lib/hoursStore";
import {
  formatTime12h,
  getShopStatusFromSettings,
  isValidHoursSettings,
  parseTime12h,
} from "@/lib/shopHours";

type AdminHoursBody = {
  password?: string;
  sellingToday?: boolean;
  openTime?: string;
  openHour?: string;
  openMinute?: string;
  openPeriod?: "AM" | "PM";
  closeTime?: string;
  closeHour?: string;
  closeMinute?: string;
  closePeriod?: "AM" | "PM";
};

function buildTime12h(hour: string, minute: string, period: string) {
  const hours24 = Number.parseInt(hour, 10);
  const minutes = Number.parseInt(minute, 10);

  if (Number.isNaN(hours24) || Number.isNaN(minutes)) return null;
  if (hours24 < 1 || hours24 > 12 || minutes < 0 || minutes > 59) return null;
  if (period !== "AM" && period !== "PM") return null;

  let hours24Value = hours24 % 12;
  if (period === "PM") hours24Value += 12;

  return formatTime12h(hours24Value, minutes);
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "dds2026";
}

export async function GET() {
  const storage = await getHoursStorageInfo();
  const blobConfigured = Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      process.env.BLOB_STORE_ID ||
      Object.keys(process.env).some((key) => key.endsWith("_READ_WRITE_TOKEN")),
  );

  return NextResponse.json({
    ok: true,
    ...storage,
    blobConfigured,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AdminHoursBody;

    if (body.password !== getAdminPassword()) {
      return NextResponse.json({ ok: false, error: "Wrong password." }, { status: 401 });
    }

    const openTime =
      body.openTime ??
      (body.openHour && body.openMinute && body.openPeriod
        ? buildTime12h(body.openHour, body.openMinute, body.openPeriod)
        : null);

    const closeTime =
      body.closeTime ??
      (body.closeHour && body.closeMinute && body.closePeriod
        ? buildTime12h(body.closeHour, body.closeMinute, body.closePeriod)
        : null);

    if (typeof body.sellingToday !== "boolean" || !openTime || !closeTime) {
      return NextResponse.json(
        { ok: false, error: "Missing or invalid shop hours." },
        { status: 400 },
      );
    }

    if (!parseTime12h(openTime) || !parseTime12h(closeTime)) {
      return NextResponse.json(
        { ok: false, error: "Time format must be like 10:00 AM." },
        { status: 400 },
      );
    }

    const nextSettings = {
      sellingToday: body.sellingToday,
      openTime,
      closeTime,
    };

    if (!isValidHoursSettings(nextSettings)) {
      return NextResponse.json(
        { ok: false, error: "Could not save hours." },
        { status: 400 },
      );
    }

    await writeHoursSettings(nextSettings);
    const saved = await readHoursSettings();
    const status = getShopStatusFromSettings(saved, hoursMessages);

    return NextResponse.json({
      ok: true,
      ...saved,
      status,
    });
  } catch (error) {
    if (error instanceof HoursStorageError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
    }

    console.error("Admin hours save failed:", error);
    return NextResponse.json(
      { ok: false, error: "Server error while saving. Try again." },
      { status: 500 },
    );
  }
}
