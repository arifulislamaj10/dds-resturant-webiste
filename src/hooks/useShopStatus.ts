"use client";

import { useCallback, useEffect, useState } from "react";
import {
  defaultHoursSettings,
  getShopStatusFromSettings,
  hoursMessages,
} from "@/config/business";
import type { HoursSettings, ShopStatus } from "@/lib/shopHours";

type HoursApiResponse = HoursSettings & {
  status?: ShopStatus;
};

export function useShopStatus() {
  const [settings, setSettings] = useState<HoursSettings>(defaultHoursSettings);
  const [status, setStatus] = useState<ShopStatus>(() =>
    getShopStatusFromSettings(defaultHoursSettings, hoursMessages),
  );
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/hours", { cache: "no-store" });
      if (!response.ok) return;

      const data = (await response.json()) as HoursApiResponse;
      const nextSettings: HoursSettings = {
        sellingToday: data.sellingToday,
        openTime: data.openTime,
        closeTime: data.closeTime,
        updatedAt: data.updatedAt,
      };

      setSettings(nextSettings);
      setStatus(
        data.status ??
          getShopStatusFromSettings(nextSettings, hoursMessages),
      );
    } catch {
      setStatus(getShopStatusFromSettings(defaultHoursSettings, hoursMessages));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();

    const timer = window.setInterval(() => {
      setSettings((current) => {
        setStatus(getShopStatusFromSettings(current, hoursMessages));
        return current;
      });
    }, 60_000);

    return () => window.clearInterval(timer);
  }, [refresh]);

  return { status, settings, loading, refresh };
}
