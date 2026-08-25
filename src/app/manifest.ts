import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { images, siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: brand.colors.cream,
    theme_color: brand.colors.primary,
    icons: [
      {
        src: images.icon,
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
