import { siteConfig } from "@/config/site";
import { getMessengerOrderUrl, getTelUrl } from "@/lib/utils";

export function Delivery() {
  return (
    <section id="delivery" className="section-dark-gradient relative py-14 sm:py-20">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="section-label">Delivery</p>
            <h2 className="section-title mt-3">San Fernando &amp; nearby</h2>
            <p className="mt-4 text-base leading-relaxed text-stone-400">
              We deliver through Lalamove or Maxim. Time depends on your location
              and order size — we always confirm before cooking.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={getMessengerOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto"
              >
                Order for delivery
              </a>
              <a href={getTelUrl(siteConfig.phone)} className="btn-secondary w-full sm:w-auto">
                Call {siteConfig.phone}
              </a>
            </div>

            <div className="mt-8 space-y-4">
              <div className="glass-dark rounded-3xl p-5 sm:p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-secondary-light">
                  Delivery areas
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {siteConfig.deliveryAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-stone-300"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-dark rounded-3xl p-5 sm:p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-secondary-light">
                  Partners
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {siteConfig.deliveryPartners.map((partner) => (
                    <span
                      key={partner}
                      className="rounded-full bg-brand-flame/20 px-4 py-1.5 text-sm font-semibold text-brand-flame-light"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-dark rounded-3xl p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
              What to send us
            </h3>
            <ol className="mt-5 space-y-4">
              {[
                "Item and quantity (e.g. 2 Cheesy Spicy Carbonara)",
                "Full address with landmark",
                "Phone number for the rider",
                "Payment: GCash, Maya, or COD",
              ].map((text, i) => (
                <li key={text} className="flex gap-4 text-sm leading-relaxed text-stone-300">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-flame/20 text-xs font-bold text-brand-flame-light">
                    {i + 1}
                  </span>
                  {text}
                </li>
              ))}
            </ol>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-secondary-light">
                  Email
                </p>
                <p className="mt-1 break-all text-sm font-semibold text-white">
                  {siteConfig.email}
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-secondary-light">
                  Location
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {siteConfig.address.area}, {siteConfig.address.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
