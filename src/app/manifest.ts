import type { MetadataRoute } from "next";
import { images, siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: images.icon,
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}
