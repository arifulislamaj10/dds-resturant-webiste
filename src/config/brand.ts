/**
 * DD's brand design system — extracted from the official logo.
 *
 * Primary:   Black (#000) — logo circle background
 * Secondary: Flame orange (#FF4500) — logo flame accent
 * Neutral:   White — text on dark backgrounds
 */
export const brand = {
  colors: {
    primary: "#000000",
    primarySoft: "#141414",
    secondary: "#FF4500",
    secondaryDark: "#E03E00",
    secondaryLight: "#FF6B35",
    white: "#FFFFFF",
    cream: "#F7F7F7",
    muted: "#EEEEEE",
    textOnLight: "#111111",
    textOnDark: "#FFFFFF",
    textMutedOnLight: "#57534E",
    textMutedOnDark: "#D6D3D1",
  },
  logo: "/images/ddslogo.jpeg",
  logoAlt: "DD's logo — black circle with orange flame, Est. 2018",
} as const;

export type BrandColors = typeof brand.colors;
