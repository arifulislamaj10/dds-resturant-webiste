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
    <section id="menu" className="bg-brand-muted py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-label">Menu</p>
          <h2 className="section-title mt-2">Choose what you want</h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            Every dish shows its price. Tap a photo to order on Messenger. See the
            full price list above for chao fan, add-ons, and all combos.
          </p>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
              activeCategory === "all"
                ? "bg-brand-flame text-white"
                : "bg-white text-stone-600 hover:text-brand-flame"
            }`}
          >
            All
          </button>
          {menuPhotoCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                activeCategory === category.id
                  ? "bg-brand-flame text-white"
                  : "bg-white text-stone-600 hover:text-brand-flame"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <a
              key={item.id}
              href={getMessengerOrderUrl(item.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${item.name} for ${item.price} on Messenger`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium active:scale-[0.99] sm:rounded-3xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Price badge — always visible on photo */}
                <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
                  <p className="text-lg font-bold leading-none text-brand-flame sm:text-xl">
                    {item.price}
                  </p>
                </div>

                {/* Name + description overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-14 pt-10 sm:px-4 sm:pb-16">
                  <h3 className="font-display text-base font-bold text-white sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 text-xs text-stone-200 sm:text-sm">
                    {item.description}
                  </p>
                </div>

                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  {item.popular && (
                    <span className="rounded-full bg-brand-flame px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                      Popular
                    </span>
                  )}
                  {item.spicy && (
                    <span className="rounded-full bg-black/80 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                      Spicy
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-stone-100 px-4 py-3 sm:px-5 sm:py-4">
                <p className="text-sm font-semibold text-brand-flame">
                  Tap to order on Messenger
                </p>
                <span className="text-sm font-bold text-brand-black">{item.price}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
