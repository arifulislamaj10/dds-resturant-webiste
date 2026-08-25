"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { heroSlides, siteConfig } from "@/config/site";
import { getMessengerOrderUrl } from "@/lib/utils";

const AUTO_PLAY_MS = 5500;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(goNext, AUTO_PLAY_MS);
    return () => window.clearInterval(timer);
  }, [activeIndex, isPaused, goNext]);

  const slide = heroSlides[activeIndex];

  return (
    <section
      className="hero-bg relative h-dvh max-h-dvh min-h-0 overflow-hidden bg-brand-charcoal"
      aria-roledescription="carousel"
      aria-label="Featured food"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full-screen background */}
      {heroSlides.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 z-0 bg-brand-charcoal transition-opacity duration-700 ease-out ${
            index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-top sm:object-center"
          />
        </div>
      ))}

      {/* Overlays — mobile: show food on top, dark panel for text below */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black from-[38%] via-black/45 via-55% to-transparent sm:bg-gradient-to-r sm:from-black/90 sm:from-0% sm:via-black/55 sm:via-50% sm:to-black/15 sm:to-100%"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-20 bg-gradient-to-b from-black/55 to-transparent sm:h-28"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col justify-end sm:justify-center sm:pt-20 lg:pt-24">
        <div className="mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
          <div
            key={slide.id}
            className="hero-slide-copy border-t border-white/10 bg-black/80 px-4 py-4 pb-[max(1rem,calc(4.75rem+env(safe-area-inset-bottom)))] backdrop-blur-md sm:max-w-xl sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:pb-10 sm:backdrop-blur-none lg:max-w-2xl lg:pb-12"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-flame-light sm:text-xs">
                {slide.tag}
              </span>
              <span className="text-[10px] text-white/40 sm:text-xs">
                {siteConfig.name} · Est. 2018
              </span>
            </div>

            <h1 className="mt-2 font-display text-2xl font-semibold leading-tight text-white sm:mt-3 sm:text-4xl lg:text-5xl xl:text-6xl">
              {slide.title}
            </h1>

            <p className="mt-2 line-clamp-2 text-sm leading-snug text-white/75 sm:mt-3 sm:line-clamp-none sm:text-base sm:leading-relaxed lg:text-lg">
              {slide.description}
            </p>

            <div className="mt-3 flex flex-wrap items-end justify-between gap-3 sm:mt-4 sm:justify-start">
              <p className="font-display text-3xl font-semibold text-brand-secondary sm:text-5xl lg:text-6xl">
                {slide.price}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-6 sm:flex sm:flex-wrap sm:gap-3">
              <a
                href={getMessengerOrderUrl(slide.orderItem)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !min-h-11 !px-3 !py-2 !text-sm sm:!min-h-12 sm:!px-6 sm:!text-base"
              >
                Order now
              </a>
              <a
                href="#menu"
                className="btn-secondary !min-h-11 !px-3 !py-2 !text-sm sm:!min-h-12 sm:!px-6 sm:!text-base"
              >
                View menu
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
