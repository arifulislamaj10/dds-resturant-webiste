import { get, put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { defaultHoursSettings } from "@/config/business";
import type { HoursSettings } from "@/lib/shopHours";
import { isValidHoursSettings } from "@/lib/shopHours";

const hoursFilePath = path.join(process.cwd(), "data", "hours.json");
const BLOB_PATHNAME = "shop-hours.json";

export class HoursStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HoursStorageError";
  }
}

type BlobClientOptions = {
  token?: string;
  storeId?: string;
};

/** Vercel may use BLOB_READ_WRITE_TOKEN or a store-specific *_READ_WRITE_TOKEN */
function getBlobClientOptions(): BlobClientOptions | null {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return { token: process.env.BLOB_READ_WRITE_TOKEN };
  }

  for (const [key, value] of Object.entries(process.env)) {
    if (key.endsWith("_READ_WRITE_TOKEN") && value) {
      return { token: value };
    }
  }

  if (process.env.BLOB_STORE_ID) {
    return { storeId: process.env.BLOB_STORE_ID };
  }

  return null;
}

function hasBlobStorage() {
  return getBlobClientOptions() !== null;
}

function getJsonBinConfig() {
  const apiKey = process.env.JSONBIN_API_KEY;
  const binId = process.env.JSONBIN_BIN_ID;

  if (!apiKey || !binId) return null;

  return { apiKey, binId };
}

async function streamToText(stream: ReadableStream<Uint8Array>) {
  return new Response(stream).text();
}

async function readHoursFromBlob(): Promise<HoursSettings | null> {
  const blobOptions = getBlobClientOptions();
  if (!blobOptions) return null;

  try {
    const result = await get(BLOB_PATHNAME, {
      ...blobOptions,
      access: "private",
      useCache: false,
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return null;
    }

    const raw = await streamToText(result.stream);
    const parsed: unknown = JSON.parse(raw);

    if (isValidHoursSettings(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.error("Vercel Blob read failed:", error);
  }

  return null;
}

async function writeHoursToBlob(settings: HoursSettings) {
  const blobOptions = getBlobClientOptions();
  if (!blobOptions) {
    return false;
  }

  try {
    await put(BLOB_PATHNAME, JSON.stringify(settings), {
      ...blobOptions,
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return true;
  } catch (error) {
    console.error("Vercel Blob write failed:", error);

    const message =
      error instanceof Error ? error.message : "Unknown Vercel Blob error";

    throw new HoursStorageError(`Could not save to Vercel Blob: ${message}`);
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
  } catch (error) {
    console.error("JSONBin read failed:", error);
  }

  return null;
}

async function writeHoursToJsonBin(settings: HoursSettings) {
  const config = getJsonBinConfig();
  if (!config) return false;

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${config.binId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": config.apiKey,
      },
      body: JSON.stringify(settings),
    });

    return response.ok;
  } catch (error) {
    console.error("JSONBin write failed:", error);
    return false;
  }
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

  if (hasBlobStorage()) {
    await writeHoursToBlob(payload);
    return;
  }

  if (await writeHoursToJsonBin(payload)) return;

  try {
    await fs.mkdir(path.dirname(hoursFilePath), { recursive: true });
    await fs.writeFile(hoursFilePath, JSON.stringify(payload, null, 2), "utf8");
  } catch (error) {
    console.error("Local file write failed:", error);
    throw new HoursStorageError(
      "Could not save hours. On the live site, connect Vercel Blob to this project and redeploy.",
    );
  }
}

export async function getHoursStorageInfo() {
  if (hasBlobStorage()) {
    return { type: "blob" as const, canSaveOnLive: true };
  }

  if (getJsonBinConfig()) {
    return { type: "jsonbin" as const, canSaveOnLive: true };
  }

  return { type: "file" as const, canSaveOnLive: false };
}
