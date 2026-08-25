import { siteConfig } from "@/config/site";
import { Logo } from "@/components/Logo";
import { getMessengerOrderUrl, getTelUrl } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="section-dark relative overflow-hidden pb-8 sm:pb-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-flame/50 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo size="lg" showText={false} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone-400">
              {siteConfig.description}
            </p>
            <a
              href={getMessengerOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              Order on Messenger
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Quick links
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-stone-400">
                {[
                  { href: "#restaurant", label: "About us" },
                  { href: "#menu", label: "Menu" },
                  { href: "#price-list", label: "Prices" },
                  { href: "#bulk-orders", label: "Bulk orders" },
                  { href: "#faq", label: "FAQ" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="transition hover:text-brand-flame-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Contact
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-stone-400">
                <li>
                  <a href={getTelUrl(siteConfig.phone)} className="font-semibold text-white hover:text-brand-flame-light">
                    {siteConfig.phone}
                  </a>
                  {" · "}
                  <a href={getTelUrl(siteConfig.phoneAlt)} className="font-semibold text-white hover:text-brand-flame-light">
                    {siteConfig.phoneAlt}
                  </a>
                </li>
                <li className="break-all">{siteConfig.email}</li>
                <li>
                  {siteConfig.address.area}, {siteConfig.address.city},{" "}
                  {siteConfig.address.region}
                </li>
                <li>
                  <a
                    href={siteConfig.facebook.pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-flame-light transition hover:text-brand-flame"
                  >
                    Facebook page →
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-sm text-stone-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="text-stone-600">Est. 2018 · Homemade with ❤️ in Pampanga</p>
        </div>
      </div>
    </footer>
  );
}
