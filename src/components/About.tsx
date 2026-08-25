import Image from "next/image";
import { images, siteConfig } from "@/config/site";

export function About() {
  return (
    <section id="about" className="section-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-premium">
                <Image
                  src={images.spicyCarbonara}
                  alt="Cheesy Spicy Carbonara"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-3xl shadow-premium">
                <Image
                  src={images.samyangOmelette}
                  alt="Samyang Omelette"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-2 rounded-2xl glass-light px-5 py-4 shadow-card sm:-right-4">
              <p className="font-display text-3xl font-semibold text-brand-black">2018</p>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Serving San Fernando
              </p>
            </div>
          </div>

          <div>
            <p className="section-label">Our story</p>
            <h2 className="section-title mt-3">Homemade food, made with love</h2>
            <p className="section-subtitle mt-4 sm:text-lg">
              {siteConfig.name} is a home-based kitchen in San Fernando, Pampanga.
              We cook pasta, omelettes, chao fan, and combo meals — delivered fresh
              via Lalamove or Maxim.
            </p>
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              With 1.9K Facebook followers and hundreds of happy customers, we keep
              portions generous and prices fair. First time ordering? Message us to
              see what&apos;s fresh today.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Best-selling carbonara & omelette",
                "Cooked fresh after confirmation",
                "Fast Messenger replies",
                "Delivery across Pampanga",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-stone-100 bg-brand-muted-warm px-4 py-3 text-sm font-medium text-stone-700"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-flame text-xs font-bold text-white">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
