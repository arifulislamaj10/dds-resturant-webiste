import type { HoursSettings } from "@/lib/shopHours";
import {
  getShopStatusFromSettings,
  getTodayHoursLabel,
} from "@/lib/shopHours";

/**
 * Default hours — used when data/hours.json is missing.
 * Owner can change hours on the website at /admin (no code needed).
 */

export const defaultHoursSettings = {
  sellingToday: true,
  openTime: "10:00 AM",
  closeTime: "8:00 PM",
} satisfies HoursSettings;

export const hoursMessages = {
  closedTodayMessage:
    "We are closed today and not accepting orders. Follow us on Facebook for updates.",
  closedNowMessage: "We are closed right now. See today's open hours below.",
  openMessage: "We are open and accepting orders.",
} as const;

export const businessSettings = {
  ...defaultHoursSettings,
  hoursNote: "We post hour updates on Facebook too.",
  ...hoursMessages,
} as const;

/** Fallback for server render before live settings load */
export function getShopStatus(now = new Date()) {
  return getShopStatusFromSettings(defaultHoursSettings, hoursMessages, now);
}

export { getShopStatusFromSettings, getTodayHoursLabel };
