"use client";

import { useShopStatus } from "@/hooks/useShopStatus";
import { getMessengerOrderUrl } from "@/lib/utils";

export function MessengerButton() {
  const { status } = useShopStatus();
  const isOrdering = status.canOrder;

  return (
    <a
      href={getMessengerOrderUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        isOrdering ? "Order on Facebook Messenger" : "Message on Facebook Messenger"
      }
      className={`fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition sm:bottom-6 sm:right-6 sm:px-5 sm:text-base ${
        isOrdering
          ? "bg-brand-flame text-white hover:bg-brand-flame-light"
          : "bg-stone-700 text-white hover:bg-stone-600"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
      >
        <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.922 1.445 5.527 3.707 7.17V22l3.405-1.87c.909.25 1.871.385 2.888.385 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.015 12.479-2.553-2.72-4.992 2.72 5.492-5.847 2.617 2.72 4.929-2.72-5.493 5.847z" />
      </svg>
      <span>{isOrdering ? "Order" : "Message"}</span>
    </a>
  );
}
