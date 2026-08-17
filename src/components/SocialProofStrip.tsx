import { siteConfig } from "@/config/site";

export function SocialProofStrip() {
  return (
    <section className="border-y border-stone-800 bg-black py-5 sm:py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold text-brand-flame sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-stone-400 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
