import { siteConfig } from "@/config/site";

export function Delivery() {
  return (
    <section id="delivery" className="bg-black py-12 text-white sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div>
            <p className="text-sm font-semibold text-brand-flame-light">Delivery</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
              San Fernando and nearby areas
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-300">
              We deliver through Lalamove or Maxim. Delivery time depends on
              your location and order size.
            </p>

            <div className="mt-6 space-y-4 sm:mt-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <h3 className="font-semibold text-brand-flame-light">Areas</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {siteConfig.deliveryAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full bg-white/10 px-3 py-1 text-sm text-stone-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <h3 className="font-semibold text-brand-flame-light">
                  Delivery partners
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {siteConfig.deliveryPartners.map((partner) => (
                    <span
                      key={partner}
                      className="rounded-full bg-white/10 px-3 py-1 text-sm text-stone-200"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:rounded-3xl sm:p-6 lg:p-8">
            <h3 className="text-lg font-bold sm:text-xl">
              Include in your message
            </h3>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-stone-300 sm:mt-5 sm:space-y-4">
              <li className="flex gap-3">
                <span className="font-bold text-brand-flame-light">1.</span>
                <span>Item and quantity (example: 2 Cheesy Spicy Carbonara)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-brand-flame-light">2.</span>
                <span>Full address with landmark</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-brand-flame-light">3.</span>
                <span>Phone number for the rider</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-brand-flame-light">4.</span>
                <span>Payment: GCash, Maya, or COD</span>
              </li>
            </ol>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-brand-flame-light">Email</p>
                <p className="mt-1 break-all text-sm font-semibold sm:text-base">
                  {siteConfig.email}
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs text-brand-flame-light">Location</p>
                <p className="mt-1 text-sm font-semibold sm:text-base">
                  {siteConfig.address.area}, {siteConfig.address.city},{" "}
                  {siteConfig.address.region}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
