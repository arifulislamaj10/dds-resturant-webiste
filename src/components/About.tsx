import Image from "next/image";
import { images, siteConfig } from "@/config/site";

export function About() {
  return (
    <section id="about" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Image
              src={images.dynamiteLumpia}
              alt="Dynamite lumpia"
              width={600}
              height={750}
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-md ring-1 ring-black/5 sm:rounded-3xl"
            />
            <Image
              src={images.dynamiteTray}
              alt="Dynamite party tray"
              width={600}
              height={750}
              className="mt-6 aspect-[4/5] w-full rounded-2xl object-cover shadow-md ring-1 ring-black/5 sm:mt-8 sm:rounded-3xl"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-semibold text-brand-flame">About DD&apos;s</p>
          <h2 className="mt-2 text-2xl font-bold text-brand-black sm:text-3xl lg:text-4xl">
            Home cooking since 2018
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
            {siteConfig.name} is a home-based food shop in San Fernando,
            Pampanga. We sell pasta, omelette, fries, and more. We deliver
            around the area through Lalamove or Maxim.
          </p>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            We have 1.9K followers on Facebook and many repeat customers. If
            it is your first time ordering, message us to check what is
            available today.
          </p>

          <ul className="mt-6 space-y-3 sm:mt-8">
            {[
              "Cheesy Spicy Carbonara and Samyang Omelette are our top orders",
              "We cook after your order is confirmed",
              "Delivery via Lalamove or Maxim",
              "Home cooking since 2018",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-stone-700 sm:text-base">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-flame/10 text-xs text-brand-flame">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
