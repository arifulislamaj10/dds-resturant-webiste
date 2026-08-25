"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  facebookPosts,
  siteConfig,
  type FacebookPostType,
} from "@/config/site";

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
    <section id="fresh-today" className="section-dark-gradient relative py-14 sm:py-20">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="section-label">Fresh today</p>
            <h2 className="section-title mt-3">From our kitchen &amp; Facebook</h2>
            <p className="mt-3 text-base leading-relaxed text-stone-400">
              Daily posts, promos, and customer favorites — just like our Facebook page.
            </p>
          </div>
          <a
            href={siteConfig.facebook.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary shrink-0"
          >
            See all on Facebook
          </a>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                activeFilter === filter.id
                  ? "bg-brand-flame text-white"
                  : "bg-white/10 text-stone-400 hover:bg-white/15 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/8"
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
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    {post.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-xl text-black shadow-xl">
                          ▶
                        </span>
                      </div>
                    )}
                  </>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                    {post.type}
                  </span>
                  {post.tag && (
                    <span className="rounded-full bg-brand-flame px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      {post.tag}
                    </span>
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-semibold text-brand-secondary-light">{post.dayLabel} · {post.date}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-300">
                    {post.caption}
                  </p>
                  {post.promoPrice && (
                    <p className="mt-2 font-display text-xl font-semibold text-brand-flame-light">
                      {post.promoPrice}
                    </p>
                  )}
                  {post.facebookUrl && (
                    <a
                      href={post.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto mt-3 inline-flex text-sm font-semibold text-white/80 transition hover:text-brand-flame-light"
                    >
                      View on Facebook →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="mt-10 text-center text-stone-500">No posts in this category yet.</p>
        )}
      </div>
    </section>
  );
}
