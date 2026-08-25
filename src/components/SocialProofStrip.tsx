import { siteConfig } from "@/config/site";

export function SocialProofStrip() {
  return (
    <section className="relative overflow-hidden border-y border-black/5 bg-white py-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-secondary/[0.04] via-transparent to-brand-secondary/[0.02]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-stone-200 sm:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="px-4 py-2 text-center first:pl-0 last:pr-0 sm:px-6">
              <p className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-stone-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
