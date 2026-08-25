import { getMessengerOrderUrl } from "@/lib/utils";

export function MessengerButton() {
  return (
    <a
      href={getMessengerOrderUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on Facebook Messenger"
      className="animate-pulse-glow fixed bottom-20 right-4 z-50 hidden min-h-12 items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-flame to-brand-flame-dark px-5 py-3.5 text-sm font-bold text-white shadow-premium transition hover:scale-105 sm:bottom-7 sm:right-7 sm:inline-flex sm:min-h-14 sm:px-6 sm:text-base"
      style={{ paddingBottom: "max(0.875rem, env(safe-area-inset-bottom))" }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
      >
        <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.922 1.445 5.527 3.707 7.17V22l3.405-1.87c.909.25 1.871.385 2.888.385 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.015 12.479-2.553-2.72-4.992 2.72 5.492-5.847 2.617 2.72 4.929-2.72-5.493 5.847z" />
      </svg>
      <span>Order now</span>
    </a>
  );
}
