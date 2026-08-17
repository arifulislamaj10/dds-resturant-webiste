import { orderSteps } from "@/config/site";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-brand-muted py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-flame">How to order</p>
          <h2 className="mt-2 text-2xl font-bold text-brand-black sm:text-3xl lg:text-4xl">
            4 easy steps
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            No app needed. Simple and fast.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {orderSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-stone-200 bg-white p-5 sm:rounded-3xl sm:p-6"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-flame text-sm font-bold text-white sm:h-10 sm:w-10 sm:rounded-2xl">
                {step.step}
              </span>
              <h3 className="mt-4 text-base font-bold text-brand-black sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-gradient-to-r from-black to-brand-flame p-5 text-center text-white sm:mt-10 sm:rounded-3xl sm:p-8">
          <h3 className="text-lg font-bold sm:text-xl lg:text-2xl">
            Ready to order?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base">
            Tap the Order button at the bottom right of the screen. We reply
            with price, delivery time, and payment details.
          </p>
        </div>
      </div>
    </section>
  );
}
