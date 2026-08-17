"use client";

import { useEffect, useState } from "react";
import { Logo, LogoLight } from "@/components/Logo";

const navLinks = [
  { href: "#price-list", label: "Prices" },
  { href: "#menu", label: "Menu" },
  { href: "#hours", label: "Hours" },
  { href: "#fresh-today", label: "Updates" },
  { href: "#bulk-orders", label: "Bulk" },
  { href: "#how-it-works", label: "How to order" },
  { href: "#delivery", label: "Delivery" },
  { href: "#reviews", label: "Reviews" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-black/85 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          {isDark ? <Logo size="sm" /> : <LogoLight size="sm" />}
        </div>

        <nav className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-sm font-medium transition ${
                scrolled
                  ? "text-stone-600 hover:text-brand-flame"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border xl:hidden ${
            scrolled
              ? "border-stone-200 bg-white text-stone-700"
              : "border-stone-700 bg-black text-white"
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
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-stone-800 bg-black px-4 py-4 xl:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="min-h-11 rounded-xl px-3 py-3 text-base font-medium text-stone-200 transition hover:bg-stone-900 hover:text-brand-flame-light"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
