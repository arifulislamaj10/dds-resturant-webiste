import Image from "next/image";
import {
  getMenuOrderUrl,
  priceListSettings,
  type PriceListItem,
} from "@/config/priceList";
import { siteConfig } from "@/config/site";
import { getMessengerOrderUrl } from "@/lib/utils";

function MenuImageDisplay() {
  return (
    <div className="overflow-hidden rounded-3xl border border-stone-200 bg-black shadow-xl">
      <a
        href={getMessengerOrderUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order from menu on Messenger"
        className="block cursor-pointer transition active:opacity-90"
      >
        <Image
          src={priceListSettings.menuImage}
          alt={priceListSettings.menuImageAlt}
          width={1200}
          height={1600}
          className="h-auto w-full"
          priority
        />
      </a>
      <div className="flex flex-col gap-3 border-t border-stone-800 bg-black px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold text-brand-flame-light">
            {siteConfig.name} · Est. 2018
          </p>
          <p className="mt-1 text-base font-bold text-white">
            {priceListSettings.orderPhones}
          </p>
        </div>
        <a
          href={getMenuOrderUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-brand-flame px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-flame-light sm:text-base"
        >
          Order now
        </a>
      </div>
    </div>
  );
}

function TextPriceList() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {priceListSettings.categories.map((group) => (
        <div
          key={group.category}
          className="overflow-hidden rounded-2xl border border-stone-200 bg-brand-muted"
        >
          <h3 className="border-b border-stone-200 bg-white px-4 py-3 text-base font-bold text-brand-black sm:px-5">
            {group.category}
          </h3>
          <ul className="divide-y divide-stone-200">
            {group.items.map((item: PriceListItem) => (
              <li
                key={item.name}
                className="flex items-start justify-between gap-4 px-4 py-3 sm:px-5"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-brand-black">{item.name}</p>
                    {item.popular && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                        Best
                      </span>
                    )}
                  </div>
                  {item.note && (
                    <p className="mt-0.5 text-xs text-stone-500">{item.note}</p>
                  )}
                </div>
                <p className="shrink-0 font-bold text-brand-flame">{item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function PriceList() {
  return (
    <section id="price-list" className="border-b border-stone-200 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-flame">
            {priceListSettings.sectionLabel}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-brand-black sm:text-3xl">
            {priceListSettings.sectionTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            {priceListSettings.sectionDescription}
          </p>
        </div>

        <div className="mt-8">
          {priceListSettings.useMenuImage ? <MenuImageDisplay /> : <TextPriceList />}
        </div>

        <p className="mt-6 text-sm text-stone-500">{priceListSettings.footerNote}</p>
      </div>
    </section>
  );
}
