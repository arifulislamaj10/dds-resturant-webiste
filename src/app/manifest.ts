import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff4500",
    icons: [
      {
        src: "/images/logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
