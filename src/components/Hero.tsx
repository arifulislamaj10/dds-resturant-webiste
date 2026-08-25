"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useShopStatus } from "@/hooks/useShopStatus";
import { heroSlides, siteConfig } from "@/config/site";
import { getMessengerOrderUrl } from "@/lib/utils";

const AUTO_PLAY_MS = 6000;

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
      className="relative min-h-dvh overflow-hidden bg-brand-charcoal text-white"
      aria-roledescription="carousel"
      aria-label="Featured food"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background images */}
      <div className="absolute inset-0">
        {heroSlides.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={item.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover ${index === activeIndex ? "hero-image-active" : ""}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        <div className="grain pointer-events-none absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-dvh max-w-7xl flex-col justify-end px-4 pb-28 pt-24 sm:px-6 sm:pb-32 lg:justify-center lg:px-8 lg:pb-24 lg:pt-28">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl animate-fade-up">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-secondary/40 bg-brand-secondary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary-light">
                {slide.tag}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  shopStatus.showOpenBadge
                    ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30"
                    : shopStatus.mode === "unavailable"
                      ? "bg-red-500/20 text-red-300 ring-1 ring-red-500/30"
                      : "bg-white/10 text-stone-300 ring-1 ring-white/10"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    shopStatus.showOpenBadge
                      ? "bg-emerald-400"
                      : shopStatus.mode === "unavailable"
                        ? "bg-red-400"
                        : "bg-stone-400"
                  }`}
                />
                {shopStatus.label}
              </span>
            </div>

            <p className="mt-5 text-sm font-medium tracking-wide text-stone-400">
              {siteConfig.name} · Est. 2018 · San Fernando, Pampanga
            </p>

            <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-7xl">
              {slide.title}
            </h1>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-stone-300 sm:text-lg">
              {slide.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <p className="font-display text-4xl font-semibold text-brand-flame-light sm:text-5xl">
                {slide.price}
              </p>
              <span className="hidden h-8 w-px bg-white/20 sm:block" />
              <p className="text-sm text-stone-400">Homemade · Freshly cooked to order</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={getMessengerOrderUrl(slide.orderItem)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary sm:min-h-12 sm:px-7 sm:text-base"
              >
                Order this now
              </a>
              <a href="#menu" className="btn-secondary sm:min-h-12 sm:px-7 sm:text-base">
                Browse full menu
              </a>
            </div>
          </div>

          {/* Thumbnail picker — desktop */}
          <div className="hidden flex-col gap-2 lg:flex">
            {heroSlides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show ${item.title}`}
                aria-current={index === activeIndex}
                onClick={() => goTo(index)}
                className={`group flex items-center gap-3 rounded-2xl p-2 text-left transition ${
                  index === activeIndex
                    ? "glass-dark shadow-glow"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 pr-2">
                  <p className="truncate text-sm font-semibold">{item.title}</p>
                  <p className="text-xs font-bold text-brand-flame-light">{item.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress + mobile dots */}
        <div className="absolute bottom-20 left-4 right-4 sm:left-6 sm:right-6 lg:bottom-10 lg:left-8 lg:max-w-xl">
          <div className="mb-3 h-0.5 overflow-hidden rounded-full bg-white/15">
            <div
              key={`${activeIndex}-${isPaused}`}
              className={`h-full rounded-full bg-brand-secondary ${isPaused ? "w-full" : "hero-progress-bar"}`}
            />
          </div>
          <div className="flex justify-center gap-3 lg:hidden">
            {heroSlides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show ${item.title}`}
                onClick={() => goTo(index)}
                className="touch-target inline-flex items-center justify-center p-2"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all ${
                    index === activeIndex ? "w-8 bg-brand-flame" : "w-1.5 bg-white/35"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
