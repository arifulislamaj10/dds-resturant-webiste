import Image from "next/image";
import Link from "next/link";
import { brand } from "@/config/brand";
import { images } from "@/config/site";

type LogoProps = {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { icon: 40, text: "text-base", est: "text-[10px]" },
  md: { icon: 52, text: "text-lg", est: "text-[11px]" },
  lg: { icon: 64, text: "text-xl", est: "text-xs" },
};

export function Logo({ showText = false, size = "md", className = "" }: LogoProps) {
  const config = sizes[size];

  return (
    <Link
      href="/"
      className={`group flex min-w-0 items-center gap-3 ${className}`}
      aria-label={`${brand.logoAlt} — home`}
    >
      <Image
        src={images.logo}
        alt="DD's"
        width={config.icon}
        height={config.icon}
        className="shrink-0 rounded-full shadow-md ring-2 ring-white/20 transition duration-300 group-hover:scale-105 group-hover:shadow-glow"
        priority
      />
      {showText && (
        <div className="min-w-0">
          <p className={`${config.text} truncate font-display font-semibold tracking-tight text-white`}>
            DD&apos;s
          </p>
          <p className={`${config.est} hidden font-medium uppercase tracking-widest text-white/60 sm:block`}>
            Est. 2018
          </p>
        </div>
      )}
    </Link>
  );
}

export function LogoLight({ showText = false, size = "md", className = "" }: LogoProps) {
  const config = sizes[size];

  return (
    <Link
      href="/"
      className={`group flex min-w-0 items-center gap-3 ${className}`}
      aria-label={`${brand.logoAlt} — home`}
    >
      <Image
        src={images.logo}
        alt="DD's"
        width={config.icon}
        height={config.icon}
        className="shrink-0 rounded-full shadow-sm ring-1 ring-black/8 transition duration-300 group-hover:scale-105"
        priority
      />
      {showText && (
        <div className="min-w-0">
          <p className={`${config.text} truncate font-display font-semibold tracking-tight text-brand-primary`}>
            DD&apos;s
          </p>
          <p className={`${config.est} hidden font-medium uppercase tracking-widest text-stone-500 sm:block`}>
            Est. 2018
          </p>
        </div>
      )}
    </Link>
  );
}
