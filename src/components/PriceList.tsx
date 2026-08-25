import {
  getMenuOrderUrl,
  priceListSettings,
  type PriceListItem,
} from "@/config/priceList";
import { siteConfig } from "@/config/site";
import { getMessengerOrderUrl } from "@/lib/utils";

function PriceRow({ item }: { item: PriceListItem }) {
  return (
    <li className="group">
      <a
        href={getMessengerOrderUrl(item.name)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start justify-between gap-4 rounded-xl px-3 py-3 transition hover:bg-brand-muted-warm sm:px-4"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-brand-black">{item.name}</p>
            {item.popular && (
              <span className="rounded-full bg-brand-flame/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-flame-dark">
                Popular
              </span>
            )}
          </div>
          {item.note && (
            <p className="mt-0.5 text-xs leading-relaxed text-stone-500 sm:text-sm">
              {item.note}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="rounded-lg bg-brand-flame px-2.5 py-1 text-sm font-bold text-white sm:text-base">
            {item.price}
          </span>
          <span className="text-[10px] font-medium text-brand-flame opacity-0 transition group-hover:opacity-100">
            Order →
          </span>
        </div>
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
    <article className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-card sm:rounded-3xl">
      <div className="border-b border-stone-100 bg-brand-charcoal px-4 py-3.5 sm:px-5">
        <h3 className="font-display text-base font-bold text-white sm:text-lg">
          {title}
        </h3>
      </div>
      <ul className="divide-y divide-stone-100 px-1 py-1 sm:px-2">
        {items.map((item) => (
          <PriceRow key={item.name} item={item} />
        ))}
      </ul>
    </article>
  );
}

export function PriceList() {
  return (
    <section id="price-list" className="border-b border-stone-200 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label">{priceListSettings.sectionLabel}</p>
            <h2 className="section-title mt-2">{priceListSettings.sectionTitle}</h2>
            <p className="mt-3 text-base leading-relaxed text-stone-600">
              {priceListSettings.sectionDescription}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 rounded-2xl border border-stone-200 bg-brand-muted px-4 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                Order hotline
              </p>
              <p className="mt-0.5 text-base font-bold text-brand-black">
                {priceListSettings.orderPhones}
              </p>
            </div>
            <a
              href={getMenuOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-brand-flame px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-flame/20 transition hover:bg-brand-flame-light"
            >
              Order on Messenger
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:gap-6 lg:grid-cols-2">
          {priceListSettings.categories.map((group) => (
            <PriceCategoryCard
              key={group.category}
              title={group.category}
              items={group.items}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-stone-500">
          {priceListSettings.footerNote}
        </p>
        <p className="mt-2 text-center text-xs text-stone-400">
          {siteConfig.name} · Est. 2018 · San Fernando, Pampanga
        </p>
      </div>
    </section>
  );
}
