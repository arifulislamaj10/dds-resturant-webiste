"use client";

import { useEffect, useState } from "react";
import { Logo, LogoLight } from "@/components/Logo";
import { getMessengerOrderUrl } from "@/lib/utils";

const navLinks = [
  { href: "#price-list", label: "Prices" },
  { href: "#menu", label: "Menu" },
  { href: "#hours", label: "Hours" },
  { href: "#fresh-today", label: "Updates" },
  { href: "#bulk-orders", label: "Bulk" },
  { href: "#reviews", label: "Reviews" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isDark = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-light border-b border-black/5 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          {isDark ? <Logo size="sm" /> : <LogoLight size="sm" />}
        </div>

        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                scrolled
                  ? "text-stone-600 hover:bg-black/5 hover:text-brand-flame"
                  : "text-stone-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={getMessengerOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary ml-2 !min-h-10 !px-5 !py-2 !text-sm"
          >
            Order now
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition xl:hidden ${
            scrolled
              ? "border border-stone-200 bg-white text-stone-700"
              : "glass-dark text-white"
          }`}
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition ${
                open ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition ${
                open ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-brand-charcoal/98 px-4 py-4 backdrop-blur-xl xl:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="min-h-12 rounded-xl px-4 py-3 text-base font-medium text-stone-200 transition hover:bg-white/5 hover:text-brand-flame-light"
              >
                {link.label}
              </a>
            ))}
            <a
              href={getMessengerOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 w-full"
            >
              Order on Messenger
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
