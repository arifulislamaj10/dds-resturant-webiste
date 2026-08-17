"use client";

import { useState } from "react";
import { faqs } from "@/config/site";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-brand-muted py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-brand-flame">FAQ</p>
          <h2 className="mt-2 text-2xl font-bold text-brand-black sm:text-3xl lg:text-4xl">
            Common questions
          </h2>
        </div>

        <div className="mt-8 space-y-3 sm:mt-10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-stone-200 bg-white"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex min-h-12 w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                >
                  <span className="font-semibold text-brand-black">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 text-xl text-brand-flame transition ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-stone-100 px-4 py-4 text-sm leading-relaxed text-stone-600 sm:px-5">
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
