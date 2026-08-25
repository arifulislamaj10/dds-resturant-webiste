import { siteConfig } from "@/config/site";

export function CommunityCTA() {
  return (
    <section className="section-dark relative overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-flame/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-secondary/10 blur-3xl" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="section-label mx-auto w-fit">Community</p>
        <h2 className="section-title mt-3">Join 1.9K+ food lovers</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone-400">
          Follow DD&apos;s on Facebook for daily food posts, promos, and new menu
          items. See what we&apos;re cooking before you order.
        </p>

        <a
          href={siteConfig.facebook.pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-dark mt-8"
        >
          Follow on Facebook
        </a>
      </div>
    </section>
  );
}
