"use client";

import { businessSettings } from "@/config/business";
import { useShopStatus } from "@/hooks/useShopStatus";

export function OpeningHours() {
  const { status, settings } = useShopStatus();

  return (
    <section id="hours" className="border-b border-stone-200 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-brand-flame">Open hours</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-black sm:text-3xl">
              Today only
            </h2>
            <p className="mt-2 text-sm text-stone-600 sm:text-base">
              {businessSettings.hoursNote}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                status.showOpenBadge
                  ? "bg-green-100 text-green-800"
                  : status.mode === "unavailable"
                    ? "bg-red-100 text-red-800"
                    : "bg-stone-200 text-stone-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  status.showOpenBadge
                    ? "bg-green-500"
                    : status.mode === "unavailable"
                      ? "bg-red-500"
                      : "bg-stone-500"
                }`}
              />
              {status.label}
            </span>
          </div>
        </div>

        <div
          className={`mt-6 rounded-2xl border px-5 py-5 sm:px-6 sm:py-6 ${
            status.mode === "open"
              ? "border-green-200 bg-green-50"
              : status.mode === "unavailable"
                ? "border-red-200 bg-red-50"
                : "border-stone-200 bg-brand-muted"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
            Today
          </p>
          <p className="mt-1 text-2xl font-bold text-brand-black sm:text-3xl">
            {status.todayHours}
          </p>
          {settings.sellingToday && (
            <p className="mt-2 text-base text-stone-600">
              Open {settings.openTime} · Close {settings.closeTime}
            </p>
          )}
          <p className="mt-3 text-sm text-stone-600">{status.message}</p>
        </div>
      </div>
    </section>
  );
}
