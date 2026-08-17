import { businessSettings, getShopStatus } from "@/config/business";

export function OpeningHours() {
  const status = getShopStatus();

  return (
    <section id="hours" className="border-b border-stone-200 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-flame">Open hours</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-black sm:text-3xl">
              When we accept orders
            </h2>
            <p className="mt-2 text-sm text-stone-600 sm:text-base">
              {businessSettings.hoursNote}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                status.showOpenBadge
                  ? "bg-green-100 text-green-800"
                  : status.mode === "unavailable"
                    ? "bg-red-100 text-red-800"
                    : "bg-stone-200 text-stone-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  status.showOpenBadge
                    ? "bg-green-500"
                    : status.mode === "unavailable"
                      ? "bg-red-500"
                      : "bg-stone-500"
                }`}
              />
              {status.label}
            </span>
            <p className="text-base font-bold text-brand-black lg:text-right">
              {businessSettings.todayHours}
            </p>
          </div>
        </div>

        {!status.canOrder && (
          <div
            className={`mt-4 rounded-xl px-4 py-3 text-sm ${
              status.mode === "unavailable"
                ? "bg-red-50 text-red-800"
                : "bg-stone-100 text-stone-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {businessSettings.schedule.map((row) => (
            <div
              key={row.day}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                row.closed
                  ? "border-stone-200 bg-stone-100 text-stone-500"
                  : "border-stone-200 bg-brand-muted"
              }`}
            >
              <span className="font-semibold text-brand-black">{row.day}</span>
              <span className={row.closed ? "font-medium" : "text-stone-600"}>
                {row.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
