export type HoursSettings = {
  sellingToday: boolean;
  openTime: string;
  closeTime: string;
  updatedAt?: string;
};

export type HoursMessages = {
  closedTodayMessage: string;
  closedNowMessage: string;
  openMessage: string;
};

export type ShopStatus = {
  mode: "open" | "closed" | "unavailable";
  label: string;
  message: string;
  canOrder: boolean;
  showOpenBadge: boolean;
  todayHours: string;
};

const TIME_ZONE = "Asia/Manila";

type ParsedTime = {
  hours: number;
  minutes: number;
};

export function parseTime12h(value: string): ParsedTime | null {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;

  let hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return null;

  if (period === "AM") {
    if (hours === 12) hours = 0;
  } else if (hours !== 12) {
    hours += 12;
  }

  return { hours, minutes };
}

export function formatTime12h(hours24: number, minutes: number): string {
  const period = hours24 >= 12 ? "PM" : "AM";
  let hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function splitTime12h(value: string) {
  const parsed = parseTime12h(value);
  if (!parsed) {
    return { hour: "10", minute: "00", period: "AM" as const };
  }

  const period = parsed.hours >= 12 ? ("PM" as const) : ("AM" as const);
  let hour12 = parsed.hours % 12;
  if (hour12 === 0) hour12 = 12;

  return {
    hour: String(hour12),
    minute: parsed.minutes.toString().padStart(2, "0"),
    period,
  };
}

function getManilaDateParts(now = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const hour = Number.parseInt(
    parts.find((part) => part.type === "hour")?.value ?? "0",
    10,
  );
  const minute = Number.parseInt(
    parts.find((part) => part.type === "minute")?.value ?? "0",
    10,
  );

  return { minutesSinceMidnight: hour * 60 + minute };
}

function toMinutesSinceMidnight(time: ParsedTime) {
  return time.hours * 60 + time.minutes;
}

export function getTodayHoursLabel(settings: HoursSettings) {
  if (!settings.sellingToday) {
    return "Today: Closed";
  }

  return `Today: ${settings.openTime} – ${settings.closeTime}`;
}

export function getShopStatusFromSettings(
  settings: HoursSettings,
  messages: HoursMessages,
  now = new Date(),
): ShopStatus {
  const todayHours = getTodayHoursLabel(settings);

  if (!settings.sellingToday) {
    return {
      mode: "unavailable",
      label: "Closed today",
      message: messages.closedTodayMessage,
      canOrder: false,
      showOpenBadge: false,
      todayHours,
    };
  }

  const open = parseTime12h(settings.openTime);
  const close = parseTime12h(settings.closeTime);
  const { minutesSinceMidnight } = getManilaDateParts(now);

  if (!open || !close) {
    return {
      mode: "open",
      label: "Open now",
      message: messages.openMessage,
      canOrder: true,
      showOpenBadge: true,
      todayHours,
    };
  }

  const openMinutes = toMinutesSinceMidnight(open);
  const closeMinutes = toMinutesSinceMidnight(close);
  const isOpenNow =
    minutesSinceMidnight >= openMinutes && minutesSinceMidnight < closeMinutes;

  if (!isOpenNow) {
    return {
      mode: "closed",
      label: "Closed now",
      message: messages.closedNowMessage,
      canOrder: false,
      showOpenBadge: false,
      todayHours,
    };
  }

  return {
    mode: "open",
    label: "Open now",
    message: messages.openMessage,
    canOrder: true,
    showOpenBadge: true,
    todayHours,
  };
}

export function isValidHoursSettings(value: unknown): value is HoursSettings {
  if (!value || typeof value !== "object") return false;

  const settings = value as Partial<HoursSettings>;
  return (
    typeof settings.sellingToday === "boolean" &&
    typeof settings.openTime === "string" &&
    typeof settings.closeTime === "string" &&
    parseTime12h(settings.openTime) !== null &&
    parseTime12h(settings.closeTime) !== null
  );
}
