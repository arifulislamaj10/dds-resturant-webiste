"use client";

import type { ReactNode } from "react";
import { useShopStatus } from "@/hooks/useShopStatus";

export function MainShell({ children }: { children: ReactNode }) {
  const { status } = useShopStatus();

  return (
    <main
      className={`pb-4 ${status.mode !== "open" ? "pt-10 sm:pt-11" : ""}`}
    >
      {children}
    </main>
  );
}
