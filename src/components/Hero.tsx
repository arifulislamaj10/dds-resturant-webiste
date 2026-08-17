"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useShopStatus } from "@/hooks/useShopStatus";
import { heroSlides } from "@/config/site";
import { getMessengerOrderUrl } from "@/lib/utils";

const AUTO_PLAY_MS = 5000;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + heroSlides.length) % heroSlides.length);
  }, []);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(goNext, AUTO_PLAY_MS);
    return () => window.clearInterval(timer);
  }, [activeIndex, isPaused, goNext]);

  const slide = heroSlides[activeIndex];
  const { status: shopStatus } = useShopStatus();

  return (
    <section
      className="relative flex min-h-dvh flex-col overflow-hidden bg-black text-white lg:block lg:min-h-dvh"
      aria-roledescription="carousel"
      aria-label="Featured food"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Food image — top on mobile, full background on desktop */}
      <div className="relative h-[42vh] min-h-[220px] max-h-[340px] shrink-0 pt-14 sm:h-[44vh] sm:max-h-[380px] sm:pt-16 lg:absolute lg:inset-0 lg:h-full lg:max-h-none lg:pt-0">
        {heroSlides.map((item, index) => (
          <a
            key={item.id}
            href={getMessengerOrderUrl(item.orderItem)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${item.title} on Messenger`}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === activeIndex
                ? "pointer-events-auto cursor-pointer opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center lg:object-center"
            />
          </a>
        ))}

        {/* Mobile: light bottom fade into content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent lg:hidden" />
        {/* Desktop: side + bottom gradients for text readability */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/90 via-black/60 to-black/20 lg:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-black/70 via-transparent to-black/30 lg:block" />
      </div>

      {/* Text + controls */}
      <div className="relative flex flex-1 flex-col justify-between px-4 pb-20 pt-4 sm:px-6 sm:pb-24 sm:pt-5 lg:absolute lg:inset-0 lg:mx-auto lg:max-w-6xl lg:justify-center lg:px-8 lg:pb-16 lg:pt-24">
        <div className="max-w-xl lg:max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block rounded-full bg-brand-flame px-3 py-1 text-xs font-semibold text-white">
              {slide.tag}
            </span>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                shopStatus.showOpenBadge
                  ? "bg-green-600/90 text-white"
                  : shopStatus.mode === "unavailable"
                    ? "bg-red-600/90 text-white"
                    : "bg-stone-600/90 text-white"
              }`}
            >
              {shopStatus.label}
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-bold leading-tight sm:mt-3 sm:text-3xl lg:text-5xl">
            {slide.title}
          </h1>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-200 sm:mt-3 sm:line-clamp-none sm:text-base lg:text-lg">
            {slide.description}
          </p>

          <p className="mt-2 text-xl font-bold text-brand-flame-light sm:mt-3 sm:text-2xl lg:text-3xl">
            {slide.price}
          </p>

          <p className="mt-1 hidden text-xs text-stone-400 sm:block sm:text-sm">
            San Agustin, San Fernando, Pampanga
          </p>

          <div className="mt-4 flex flex-wrap gap-3 sm:mt-6">
            <a
              href={getMessengerOrderUrl(slide.orderItem)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-brand-flame px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-flame-light sm:min-h-11 sm:px-6 sm:py-3 sm:text-base"
            >
              Order this
            </a>
            <a
              href="#menu"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/30 bg-black/40 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-brand-flame hover:text-brand-flame-light sm:min-h-11 sm:px-6 sm:py-3 sm:text-base"
            >
              View menu
            </a>
          </div>
        </div>

        <div className="mt-4 flex justify-center lg:absolute lg:bottom-8 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2">
          {heroSlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.title}`}
              aria-current={index === activeIndex}
              onClick={() => goTo(index)}
              className={`mx-1 h-2 rounded-full transition-all ${
                index === activeIndex
                  ? "w-8 bg-brand-flame"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
