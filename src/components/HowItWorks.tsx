import { orderSteps } from "@/config/site";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-light py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label mx-auto w-fit">How to order</p>
          <h2 className="section-title mt-3">Four simple steps</h2>
          <p className="section-subtitle mx-auto">No app download. Just Messenger.</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {orderSteps.map((step, index) => (
            <div
              key={step.step}
              className="surface-card relative !rounded-3xl p-6 sm:p-7"
            >
              {index < orderSteps.length - 1 && (
                <span
                  className="absolute -right-2.5 top-1/2 hidden h-px w-5 bg-stone-200 lg:block"
                  aria-hidden="true"
                />
              )}
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-flame to-brand-flame-dark font-display text-lg font-semibold text-white shadow-glow">
                {step.step}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-brand-black">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-charcoal via-brand-ink to-black p-8 text-center text-white sm:p-12">
          <div className="grain pointer-events-none absolute inset-0" />
          <div className="relative">
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">
              Hungry? Let&apos;s go.
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-400 sm:text-base">
              Tap the Order button. We reply with price, delivery time, and payment
              details — usually within minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
