"use client";

import { useState } from "react";
import { faqs } from "@/config/site";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-muted py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="section-label mx-auto w-fit">FAQ</p>
          <h2 className="section-title mt-3">Got questions?</h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition hover:shadow-card"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5"
                >
                  <span className="min-w-0 flex-1 text-left text-sm font-semibold text-brand-black sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-muted text-lg font-light text-brand-flame transition ${
                      isOpen ? "rotate-45 bg-brand-flame/10" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-stone-100 px-5 py-4 text-sm leading-relaxed text-stone-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
