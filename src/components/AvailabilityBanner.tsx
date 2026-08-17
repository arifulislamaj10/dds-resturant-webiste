"use client";

import { useShopStatus } from "@/hooks/useShopStatus";

export function AvailabilityBanner() {
  const { status } = useShopStatus();

  if (status.mode === "open") {
    return null;
  }

  return (
    <div
      className={`fixed inset-x-0 top-[52px] z-40 border-b px-4 py-2.5 text-center text-sm font-medium sm:top-[56px] ${
        status.mode === "unavailable"
          ? "border-red-900/30 bg-red-950 text-red-100"
          : "border-stone-700 bg-stone-900 text-stone-200"
      }`}
      role="status"
    >
      <p>{status.message}</p>
    </div>
  );
}
