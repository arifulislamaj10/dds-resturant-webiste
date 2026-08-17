import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import { defaultHoursSettings } from "@/config/business";
import type { HoursSettings } from "@/lib/shopHours";
import { isValidHoursSettings } from "@/lib/shopHours";

const hoursFilePath = path.join(process.cwd(), "data", "hours.json");
const REDIS_KEY = "dds-shop-hours";

export class HoursStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HoursStorageError";
  }
}

function getRedis() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;

  return new Redis({ url, token });
}

async function readHoursFromFile(): Promise<HoursSettings | null> {
  try {
    const raw = await fs.readFile(hoursFilePath, "utf8");
    const parsed: unknown = JSON.parse(raw);

    if (isValidHoursSettings(parsed)) {
      return parsed;
    }
  } catch {
    // File missing or invalid.
  }

  return null;
}

export function isCloudHoursStorageReady() {
  return getRedis() !== null;
}

export async function readHoursSettings(): Promise<HoursSettings> {
  const redis = getRedis();

  if (redis) {
    try {
      const stored = await redis.get<HoursSettings>(REDIS_KEY);
      if (stored && isValidHoursSettings(stored)) {
        return stored;
      }

      const fromFile = await readHoursFromFile();
      if (fromFile) {
        await redis.set(REDIS_KEY, fromFile);
        return fromFile;
      }
    } catch {
      // Fall through to file/default below.
    }
  }

  const fromFile = await readHoursFromFile();
  if (fromFile) return fromFile;

  return { ...defaultHoursSettings };
}

export async function writeHoursSettings(settings: HoursSettings) {
  const payload: HoursSettings = {
    ...settings,
    updatedAt: new Date().toISOString(),
  };

  const redis = getRedis();

  if (redis) {
    await redis.set(REDIS_KEY, payload);
    return;
  }

  try {
    await fs.mkdir(path.dirname(hoursFilePath), { recursive: true });
    await fs.writeFile(hoursFilePath, JSON.stringify(payload, null, 2), "utf8");
  } catch {
    throw new HoursStorageError(
      "Saving is not set up on Vercel yet. Connect free Redis storage in Vercel → Storage → Redis, then redeploy.",
    );
  }
}
