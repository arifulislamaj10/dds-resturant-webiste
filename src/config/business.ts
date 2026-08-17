/**
 * ============================================================
 *  OWNER SETTINGS — edit this file to control your shop online
 * ============================================================
 *
 * acceptingOrders  →  false = shop paused (holiday, sold out, etc.)
 * isOpenNow        →  false = closed at this moment
 * todayHours       →  change daily if needed
 * schedule         →  your weekly open times
 */

export const businessSettings = {
  /** Set to false when you are NOT taking orders (rest day, holiday, etc.) */
  acceptingOrders: true,

  /** Set to false when you are closed right now (after hours, etc.) */
  isOpenNow: true,

  /** Message when acceptingOrders is false */
  unavailableMessage:
    "We are not accepting orders right now. Follow us on Facebook for updates.",

  /** Message when closed but may open later today */
  closedNowMessage:
    "We are closed right now. Check the schedule below for open hours.",

  /** Message when open and accepting orders */
  openMessage: "We are open and accepting orders.",

  /** Update this any day your hours change */
  todayHours: "Today: 10:00 AM - 8:00 PM",

  /** Extra note shown in the hours section */
  hoursNote:
    "Hours may change. We post daily hour updates on Facebook too.",

  /**
   * Weekly schedule — change time for each day.
   * Set closed: true and time: "Closed" for rest days.
   */
  schedule: [
    { day: "Monday", time: "10:00 AM - 8:00 PM", closed: false },
    { day: "Tuesday", time: "10:00 AM - 8:00 PM", closed: false },
    { day: "Wednesday", time: "10:00 AM - 8:00 PM", closed: false },
    { day: "Thursday", time: "10:00 AM - 8:00 PM", closed: false },
    { day: "Friday", time: "10:00 AM - 9:00 PM", closed: false },
    { day: "Saturday", time: "10:00 AM - 9:00 PM", closed: false },
    { day: "Sunday", time: "10:00 AM - 8:00 PM", closed: false },
  ],
} as const;

export type BusinessScheduleDay = (typeof businessSettings.schedule)[number];

/** Used by components — do not edit unless you know what you are doing */
export function getShopStatus() {
  const { acceptingOrders, isOpenNow } = businessSettings;

  if (!acceptingOrders) {
    return {
      mode: "unavailable" as const,
      label: "Not accepting orders",
      message: businessSettings.unavailableMessage,
      canOrder: false,
      showOpenBadge: false,
    };
  }

  if (!isOpenNow) {
    return {
      mode: "closed" as const,
      label: "Closed now",
      message: businessSettings.closedNowMessage,
      canOrder: false,
      showOpenBadge: false,
    };
  }

  return {
    mode: "open" as const,
    label: "Open now",
    message: businessSettings.openMessage,
    canOrder: true,
    showOpenBadge: true,
  };
}
