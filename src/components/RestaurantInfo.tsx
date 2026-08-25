"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { defaultHoursSettings } from "@/config/business";
import { images, siteConfig } from "@/config/site";
import { getMessengerOrderUrl, getTelUrl } from "@/lib/utils";

const highlights = [
  {
    title: "Home kitchen",
    text: "Every order is cooked fresh in our home kitchen in San Agustin — not a fast-food chain.",
  },
  {
    title: "Delivery",
    text: "We send orders around San Fernando and nearby areas through Lalamove or Maxim.",
  },
  {
    title: "Pickup",
    text: "Prefer to pick up? Message us on Messenger and we will prepare your order for collection.",
  },
  {
    title: "Dine-at-home vibe",
    text: "Big portions, cheesy pasta, chao fan, and combo meals made for sharing with family.",
  },
];

type PublicHours = {
  openTime: string;
  closeTime: string;
};

export function RestaurantInfo() {
  const [hours, setHours] = useState<PublicHours>({
    openTime: defaultHoursSettings.openTime,
    closeTime: defaultHoursSettings.closeTime,
  });

  useEffect(() => {
    fetch("/api/hours", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: PublicHours | null) => {
        if (data?.openTime && data?.closeTime) {
          setHours({ openTime: data.openTime, closeTime: data.closeTime });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="restaurant" className="section-white border-b border-stone-200/80 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="section-label">The restaurant</p>
            <h2 className="section-title mt-3">
              DD&apos;s — homemade since 2018
            </h2>
            <p className="section-subtitle mt-4 sm:text-lg">
              {siteConfig.name} is a home-based food shop in{" "}
              {siteConfig.address.area}, {siteConfig.address.city},{" "}
              {siteConfig.address.region}. We started in 2018 serving neighbors
              and grew through word of mouth and Facebook.
            </p>
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              We are known for cheesy spicy carbonara, Samyang omelette, chao fan,
              and filling combo meals. Most customers order for delivery, but
              pickup is welcome — message us first so we can cook your food fresh.
            </p>

            <div className="mt-5 inline-flex rounded-2xl border border-stone-200 bg-brand-muted px-4 py-3">
              <p className="text-sm font-medium text-stone-600">
                <span className="font-bold text-foreground">Today&apos;s hours: </span>
                {hours.openTime} – {hours.closeTime}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={getMessengerOrderUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
                Order or reserve pickup
              </a>
              <a href={getTelUrl(siteConfig.phone)} className="btn-outline w-full sm:w-auto">
                Call us
              </a>
            </div>

            <p className="mt-5 text-sm text-stone-500">
              📍 {siteConfig.address.area}, {siteConfig.address.city} ·{" "}
              {siteConfig.phone}
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-premium">
              <Image
                src={images.hungarianNuggets}
                alt="DD's combo meals"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 px-3 py-2 shadow-card">
                <Image
                  src={images.logo}
                  alt=""
                  width={44}
                  height={44}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-bold text-foreground">DD&apos;s</p>
                  <p className="text-xs text-stone-500">Est. 2018 · San Agustin</p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-stone-100 bg-brand-muted-warm p-4"
                >
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
