import { list, put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { defaultHoursSettings } from "@/config/business";
import type { HoursSettings } from "@/lib/shopHours";
import { isValidHoursSettings } from "@/lib/shopHours";

const hoursFilePath = path.join(process.cwd(), "data", "hours.json");
const BLOB_NAME = "shop-hours.json";

export class HoursStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HoursStorageError";
  }
}

function hasBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function getJsonBinConfig() {
  const apiKey = process.env.JSONBIN_API_KEY;
  const binId = process.env.JSONBIN_BIN_ID;

  if (!apiKey || !binId) return null;

  return { apiKey, binId };
}

async function readHoursFromBlob(): Promise<HoursSettings | null> {
  if (!hasBlobStorage()) return null;

  try {
    const { blobs } = await list({ prefix: BLOB_NAME, limit: 1 });
    const blob = blobs.find((item) => item.pathname === BLOB_NAME) ?? blobs[0];

    if (!blob?.url) return null;

    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) return null;

    const parsed: unknown = await response.json();
    if (isValidHoursSettings(parsed)) {
      return parsed;
    }
  } catch {
    // Fall through to other storage.
  }

  return null;
}

async function writeHoursToBlob(settings: HoursSettings) {
  if (!hasBlobStorage()) return false;

  try {
    await put(BLOB_NAME, JSON.stringify(settings), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return true;
  } catch {
    return false;
  }
}

async function readHoursFromJsonBin(): Promise<HoursSettings | null> {
  const config = getJsonBinConfig();
  if (!config) return null;

  try {
    const response = await fetch(
      `https://api.jsonbin.io/v3/b/${config.binId}/latest`,
      {
        headers: {
          "X-Master-Key": config.apiKey,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const body = (await response.json()) as { record?: unknown };
    if (body.record && isValidHoursSettings(body.record)) {
      return body.record;
    }
  } catch {
    // Fall through to file/default.
  }

  return null;
}

async function writeHoursToJsonBin(settings: HoursSettings) {
  const config = getJsonBinConfig();
  if (!config) return false;

  const response = await fetch(`https://api.jsonbin.io/v3/b/${config.binId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": config.apiKey,
    },
    body: JSON.stringify(settings),
  });

  return response.ok;
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

export async function readHoursSettings(): Promise<HoursSettings> {
  const fromBlob = await readHoursFromBlob();
  if (fromBlob) return fromBlob;

  const fromJsonBin = await readHoursFromJsonBin();
  if (fromJsonBin) return fromJsonBin;

  const fromFile = await readHoursFromFile();
  if (fromFile) return fromFile;

  return { ...defaultHoursSettings };
}

export async function writeHoursSettings(settings: HoursSettings) {
  const payload: HoursSettings = {
    ...settings,
    updatedAt: new Date().toISOString(),
  };

  if (await writeHoursToBlob(payload)) return;
  if (await writeHoursToJsonBin(payload)) return;

  try {
    await fs.mkdir(path.dirname(hoursFilePath), { recursive: true });
    await fs.writeFile(hoursFilePath, JSON.stringify(payload, null, 2), "utf8");
  } catch {
    throw new HoursStorageError(
      "Live site save needs Vercel Blob (recommended): Vercel project → Storage → Blob → Connect → Redeploy.",
    );
  }
}

export async function getHoursStorageInfo() {
  if (hasBlobStorage()) return { type: "blob" as const, canSaveOnLive: true };
  if (getJsonBinConfig()) return { type: "jsonbin" as const, canSaveOnLive: true };
  return { type: "file" as const, canSaveOnLive: false };
}
