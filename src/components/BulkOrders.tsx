import Image from "next/image";
import { completedBulkOrders } from "@/config/site";
import { getMessengerOrderUrl } from "@/lib/utils";

export function BulkOrders() {
  return (
    <section id="bulk-orders" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-brand-flame">Bulk orders</p>
          <h2 className="mt-2 text-2xl font-bold text-brand-black sm:text-3xl lg:text-4xl">
            For parties, offices, and family events
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            We accept bulk orders from 20 up to 60+ meals. Here are some we have
            completed. Message us at least 1 day before.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {completedBulkOrders.map((order) => (
            <a
              key={order.id}
              href={getMessengerOrderUrl(`Bulk order: ${order.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Message about bulk order: ${order.title}`}
              className="block overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] sm:rounded-3xl"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={order.image}
                  alt={order.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white sm:left-4 sm:top-4">
                  {order.eventType}
                </span>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-brand-black sm:text-xl">
                    {order.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-brand-muted-warm px-3 py-1 text-xs font-bold text-brand-flame-dark">
                    {order.quantity}
                  </span>
                </div>
                <p className="mt-2 text-sm text-stone-500">
                  {order.location} · {order.date}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {order.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-black px-5 py-7 text-center text-white sm:mt-10 sm:rounded-3xl sm:px-8 sm:py-8">
          <h3 className="text-xl font-bold sm:text-2xl">Planning an event?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-stone-400 sm:text-base">
            For bulk orders, use the Order button at the bottom right. Message
            us at least 1 day before your event.
          </p>
        </div>
      </div>
    </section>
  );
}
