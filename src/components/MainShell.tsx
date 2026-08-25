"use client";

import type { ReactNode } from "react";

export function MainShell({ children }: { children: ReactNode }) {
  return (
    <main className="pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] sm:pb-6">
      {children}
    </main>
  );
}
