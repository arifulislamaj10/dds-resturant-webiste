"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  facebookPosts,
  type FacebookPostType,
} from "@/config/site";
import { siteConfig } from "@/config/site";

const filters: { id: FacebookPostType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "photo", label: "Photos" },
  { id: "video", label: "Videos" },
  { id: "promo", label: "Promos" },
  { id: "review", label: "Reviews" },
];

export function FacebookUpdates() {
  const [activeFilter, setActiveFilter] = useState<FacebookPostType | "all">(
    "all",
  );

  const filteredPosts = useMemo(() => {
    if (activeFilter === "all") return facebookPosts;
    return facebookPosts.filter((post) => post.type === activeFilter);
  }, [activeFilter]);

  return (
    <section id="fresh-today" className="bg-black py-12 text-white sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-flame-light">
              Facebook updates
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
              Daily posts, videos, and promos
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-400">
              Same kind of updates we post on Facebook every day. Add new posts
              in the website config when you upload on Facebook.
            </p>
          </div>
          <a
            href={siteConfig.facebook.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-stone-700 px-5 py-3 text-sm font-semibold text-white transition hover:border-brand-flame hover:text-brand-flame-light"
          >
            See all on Facebook
          </a>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter.id
                  ? "bg-brand-flame text-white"
                  : "bg-stone-900 text-stone-300 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60 sm:rounded-3xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {post.type === "video" && post.videoSrc ? (
                  <video
                    src={post.videoSrc}
                    controls
                    playsInline
                    preload="metadata"
                    poster={post.image}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    {post.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-xl text-black shadow-xl">
                          ▶
                        </span>
                      </div>
                    )}
                  </>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold capitalize text-white">
                    {post.type}
                  </span>
                  <span className="rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
                    {post.dayLabel}
                  </span>
                  {post.tag && (
                    <span className="rounded-full bg-brand-flame px-2.5 py-1 text-xs font-semibold text-white">
                      {post.tag}
                    </span>
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs text-brand-flame-light">{post.date}</p>
                  <h3 className="mt-1 text-lg font-bold">{post.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-300">
                    {post.caption}
                  </p>
                  {post.promoPrice && (
                    <p className="mt-2 text-lg font-bold text-brand-flame-light">
                      {post.promoPrice}
                    </p>
                  )}
                  {post.facebookUrl && (
                    <a
                      href={post.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto mt-3 inline-flex text-sm font-semibold text-white underline-offset-2 hover:text-brand-flame-light hover:underline"
                    >
                      View on Facebook
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="mt-8 text-center text-stone-400">
            No posts in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
