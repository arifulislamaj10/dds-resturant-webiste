"use client";

import { siteConfig } from "@/config/site";
import { getMessengerOrderUrl, getTelUrl } from "@/lib/utils";

/** Sticky call + order bar — mobile only. */
export function MobileQuickActions() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-4 py-3 shadow-[0_-8px_32px_rgb(0_0_0/0.08)] backdrop-blur-md sm:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={getTelUrl(siteConfig.phone)}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-stone-200 bg-white text-sm font-bold text-foreground transition active:scale-[0.98]"
        >
          <span aria-hidden="true">📞</span>
          Call
        </a>
        <a
          href={getMessengerOrderUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary min-h-11 flex-[2] !py-2.5 text-sm"
        >
          Order delivery
        </a>
      </div>
    </div>
  );
}
