import { promises as fs } from "fs";
import path from "path";
import { defaultHoursSettings } from "@/config/business";
import type { HoursSettings } from "@/lib/shopHours";
import { isValidHoursSettings } from "@/lib/shopHours";

const hoursFilePath = path.join(process.cwd(), "data", "hours.json");

export async function readHoursSettings(): Promise<HoursSettings> {
  try {
    const raw = await fs.readFile(hoursFilePath, "utf8");
    const parsed: unknown = JSON.parse(raw);

    if (isValidHoursSettings(parsed)) {
      return parsed;
    }
  } catch {
    // Fall back to defaults when file is missing or invalid.
  }

  return { ...defaultHoursSettings };
}

export async function writeHoursSettings(settings: HoursSettings) {
  await fs.mkdir(path.dirname(hoursFilePath), { recursive: true });
  await fs.writeFile(
    hoursFilePath,
    JSON.stringify(
      {
        ...settings,
        updatedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
    "utf8",
  );
}
