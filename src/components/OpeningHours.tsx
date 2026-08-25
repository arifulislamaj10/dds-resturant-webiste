"use client";

import { businessSettings } from "@/config/business";
import { useShopStatus } from "@/hooks/useShopStatus";

export function OpeningHours() {
  const { status, settings } = useShopStatus();

  return (
    <section id="hours" className="section-white border-b border-stone-200/80 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-card !shadow-card overflow-hidden lg:flex lg:items-stretch">
          <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="section-label">Open hours</p>
            <h2 className="section-title mt-3">We&apos;re cooking today</h2>
            <p className="section-subtitle">{businessSettings.hoursNote}</p>
          </div>

          <div
            className={`flex flex-1 flex-col justify-center border-t p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10 ${
              status.mode === "open"
                ? "border-emerald-100 bg-gradient-to-br from-emerald-50 to-white"
                : status.mode === "unavailable"
                  ? "border-red-100 bg-gradient-to-br from-red-50 to-white"
                  : "border-stone-100 bg-brand-muted"
            }`}
          >
            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ${
                status.showOpenBadge
                  ? "bg-emerald-500/15 text-emerald-800"
                  : status.mode === "unavailable"
                    ? "bg-red-500/15 text-red-800"
                    : "bg-stone-200/80 text-stone-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  status.showOpenBadge
                    ? "bg-emerald-500 animate-pulse"
                    : status.mode === "unavailable"
                      ? "bg-red-500"
                      : "bg-stone-500"
                }`}
              />
              {status.label}
            </span>

            <p className="mt-4 font-display text-4xl font-semibold text-foreground sm:text-5xl">
              {status.todayHours}
            </p>

            {settings.sellingToday && (
              <p className="mt-2 text-base font-medium text-stone-600">
                Open {settings.openTime} · Close {settings.closeTime}
              </p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-stone-500">{status.message}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
