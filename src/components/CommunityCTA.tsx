import { siteConfig } from "@/config/site";

export function CommunityCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-12 text-white sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute -right-10 top-0 h-64 w-64 rounded-full bg-brand-flame/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold text-brand-flame-light">
          Follow us on Facebook
        </p>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
          Good food, easy ordering
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-stone-400">
          Over 1.9K people follow DD&apos;s on Facebook. Check our page for
          updates, photos, and new items.
        </p>

        <div className="mt-7 sm:mt-8">
          <a
            href={siteConfig.facebook.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-600 px-6 py-3.5 text-base font-semibold text-white transition hover:border-brand-flame hover:text-brand-flame-light"
          >
            Open Facebook page
          </a>
        </div>
      </div>
    </section>
  );
}
