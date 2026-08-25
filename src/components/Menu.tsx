"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  menuPhotoCategories,
  menuPhotoItems,
  type MenuCategory,
} from "@/config/priceList";
import { getMessengerOrderUrl } from "@/lib/utils";

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">(
    "all",
  );

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return menuPhotoItems;
    return menuPhotoItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="menu" className="section-muted py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-label">Our menu</p>
          <h2 className="section-title mt-3">Pick your craving</h2>
          <p className="section-subtitle">
            Real photos, real prices. Tap any dish to order instantly on Messenger.
            Full price list with all combos is right below.
          </p>
        </div>

        <div className="scroll-chip-row mt-8">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`min-h-11 shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${
              activeCategory === "all"
                ? "bg-brand-charcoal text-white shadow-card"
                : "bg-white text-stone-600 hover:text-brand-flame"
            }`}
          >
            All dishes
          </button>
          {menuPhotoCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`min-h-11 shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                activeCategory === category.id
                  ? "bg-brand-charcoal text-white shadow-card"
                  : "bg-white text-stone-600 hover:text-brand-flame"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <a
              key={item.id}
              href={getMessengerOrderUrl(item.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${item.name} for ${item.price}`}
              className="surface-card group !rounded-3xl"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {item.popular && (
                    <span className="rounded-full bg-brand-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      Popular
                    </span>
                  )}
                  {item.spicy && (
                    <span className="rounded-full bg-brand-flame px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      Spicy
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                        {item.name}
                      </h3>
                      <p className="mt-0.5 line-clamp-2 text-xs text-stone-300 sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                    <span className="price-tag shrink-0 text-base sm:text-lg">{item.price}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-stone-100 px-5 py-4">
                <span className="text-sm font-semibold text-brand-flame">
                  Order on Messenger →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
