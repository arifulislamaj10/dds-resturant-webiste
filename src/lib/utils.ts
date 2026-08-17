import { siteConfig } from "@/config/site";

export function getMessengerOrderUrl(itemName?: string) {
  const base = siteConfig.facebook.messengerUrl;
  if (!itemName) return base;

  const message = encodeURIComponent(
    `Hi ${siteConfig.name}! I would like to order ${itemName}. Is it available today? What is the delivery time?`,
  );
  return `${base}?text=${message}`;
}

export function getStructuredData() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    servesCuisine: "Filipino home cooking, pasta, spicy food",
    priceRange: "₱",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.area,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    sameAs: [siteConfig.facebook.pageUrl],
  };

  if (siteConfig.phone) {
    data.telephone = siteConfig.phone;
  }

  return data;
}
