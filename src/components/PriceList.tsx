import {
  getMenuOrderUrl,
  priceListSettings,
  type PriceListItem,
} from "@/config/priceList";
import { siteConfig } from "@/config/site";
import { getMessengerOrderUrl, getTelUrl } from "@/lib/utils";

function PriceRow({ item }: { item: PriceListItem }) {
  return (
    <li>
      <a
        href={getMessengerOrderUrl(item.name)}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-end gap-1 rounded-xl px-3 py-2.5 transition hover:bg-brand-muted-warm sm:px-4"
      >
        <div className="min-w-0 shrink">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-foreground">{item.name}</span>
            {item.popular && (
              <span className="rounded-full bg-brand-flame/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-flame">
                Best
              </span>
            )}
          </div>
          {item.note && (
            <p className="mt-0.5 text-xs leading-relaxed text-stone-500">{item.note}</p>
          )}
        </div>
        <span className="menu-row-leader hidden sm:block" aria-hidden="true" />
        <span className="shrink-0 font-display text-lg font-semibold text-brand-flame sm:text-xl">
          {item.price}
        </span>
      </a>
    </li>
  );
}

function PriceCategoryCard({
  title,
  items,
}: {
  title: string;
  items: PriceListItem[];
}) {
  return (
    <article className="surface-card !rounded-3xl">
      <div className="border-b border-stone-100 bg-gradient-to-r from-brand-charcoal to-brand-ink px-5 py-4 sm:px-6">
        <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
          {title}
        </h3>
      </div>
      <ul className="divide-y divide-stone-100 px-1 py-2 sm:px-2">
        {items.map((item) => (
          <PriceRow key={item.name} item={item} />
        ))}
      </ul>
    </article>
  );
}

export function PriceList() {
  return (
    <section id="price-list" className="section-light py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label">{priceListSettings.sectionLabel}</p>
            <h2 className="section-title mt-3">{priceListSettings.sectionTitle}</h2>
            <p className="section-subtitle">{priceListSettings.sectionDescription}</p>
          </div>

          <div className="glass-light flex shrink-0 flex-col gap-4 rounded-3xl p-5 sm:flex-row sm:items-center sm:gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Hotline
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-foreground">
                <a href={getTelUrl(siteConfig.phone)} className="hover:text-brand-flame">
                  {siteConfig.phone}
                </a>
                <span className="text-stone-400"> / </span>
                <a href={getTelUrl(siteConfig.phoneAlt)} className="hover:text-brand-flame">
                  {siteConfig.phoneAlt}
                </a>
              </p>
            </div>
            <a
              href={getMenuOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary shrink-0"
            >
              Order on Messenger
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {priceListSettings.categories.map((group) => (
            <PriceCategoryCard
              key={group.category}
              title={group.category}
              items={group.items}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-stone-500">
          {priceListSettings.footerNote}
        </p>
        <p className="mt-1 text-center text-xs text-stone-400">
          {siteConfig.name} · Est. 2018 · San Fernando, Pampanga
        </p>
      </div>
    </section>
  );
}
