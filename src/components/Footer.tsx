import { siteConfig } from "@/config/site";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-stone-800 bg-black pb-24 text-white sm:pb-8">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="sm:col-span-2">
            <Logo size="md" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-400">
              <li>
                <a href="#menu" className="inline-block py-1 hover:text-brand-flame-light">
                  Menu
                </a>
              </li>
              <li>
                <a href="#hours" className="inline-block py-1 hover:text-brand-flame-light">
                  Open hours
                </a>
              </li>
              <li>
                <a href="#fresh-today" className="inline-block py-1 hover:text-brand-flame-light">
                  Updates
                </a>
              </li>
              <li>
                <a href="#bulk-orders" className="inline-block py-1 hover:text-brand-flame-light">
                  Bulk orders
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="inline-block py-1 hover:text-brand-flame-light">
                  How to order
                </a>
              </li>
              <li>
                <a href="#faq" className="inline-block py-1 hover:text-brand-flame-light">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-400">
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
                  className="inline-block py-1 hover:text-brand-flame-light"
                >
                  Facebook page
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-stone-800 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <a
            href={siteConfig.facebook.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-flame-light hover:text-brand-flame"
          >
            Visit our Facebook page
          </a>
        </div>
      </div>
    </footer>
  );
}
