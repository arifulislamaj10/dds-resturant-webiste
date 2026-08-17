"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  menuCategories,
  menuItems,
  type MenuCategory,
} from "@/config/priceList";

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">(
    "all",
  );

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="menu" className="bg-brand-muted py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-flame">Menu</p>
          <h2 className="mt-2 text-2xl font-bold text-brand-black sm:text-3xl lg:text-4xl">
            Choose what you want
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            Same prices as our official price list above. Pick a dish below,
            then use the Order button at the bottom right when you are ready.
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
          {menuCategories.map((category) => (
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
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:rounded-3xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 flex gap-2">
                  {item.popular && (
                    <span className="rounded-full bg-brand-flame px-2.5 py-1 text-xs font-semibold text-white">
                      Popular
                    </span>
                  )}
                  {item.spicy && (
                    <span className="rounded-full bg-black/80 px-2.5 py-1 text-xs font-semibold text-white">
                      Spicy
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-brand-black sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="shrink-0 text-base font-bold text-brand-flame sm:text-lg">
                    {item.price}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
