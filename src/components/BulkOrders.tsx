import Image from "next/image";
import { completedBulkOrders } from "@/config/site";
import { getMessengerOrderUrl } from "@/lib/utils";

export function BulkOrders() {
  return (
    <section id="bulk-orders" className="section-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label mx-auto w-fit">Bulk orders</p>
          <h2 className="section-title mt-3">Feed the whole crew</h2>
          <p className="section-subtitle mx-auto">
            Parties, offices, and family events — from 20 up to 60+ meals. Message us
            at least 1 day ahead.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {completedBulkOrders.map((order) => (
            <a
              key={order.id}
              href={getMessengerOrderUrl(`Bulk order: ${order.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card group !rounded-3xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={order.image}
                  alt={order.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-charcoal">
                  {order.eventType}
                </span>
                <span className="absolute bottom-4 right-4 rounded-xl bg-brand-flame px-3 py-1 text-xs font-bold text-white">
                  {order.quantity}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="font-display text-xl font-semibold text-brand-black">
                  {order.title}
                </h3>
                <p className="mt-1 text-sm text-stone-500">
                  {order.location} · {order.date}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {order.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl bg-brand-charcoal px-6 py-10 text-center text-white sm:px-10 sm:py-12">
          <div className="grain pointer-events-none absolute inset-0" />
          <div className="relative">
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">
              Planning an event?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-400 sm:text-base">
              Use the Order button to message us. Tell us your date, headcount, and
              preferred dishes — we&apos;ll handle the rest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
