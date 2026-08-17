import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { icon: 32, text: "text-sm", est: "text-[10px]" },
  md: { icon: 40, text: "text-base", est: "text-[11px]" },
  lg: { icon: 48, text: "text-lg", est: "text-xs" },
};

export function Logo({ showText = true, size = "md", className = "" }: LogoProps) {
  const config = sizes[size];

  return (
    <Link href="/" className={`group flex min-w-0 items-center gap-2.5 sm:gap-3 ${className}`}>
      <Image
        src="/images/logo.jpg"
        alt="DD's logo"
        width={config.icon}
        height={config.icon}
        className="shrink-0 rounded-full ring-2 ring-white/20 transition group-hover:scale-105"
        priority
      />
      {showText && (
        <div className="min-w-0">
          <p className={`${config.text} truncate font-bold text-white`}>
            DD&apos;s
          </p>
          <p className={`${config.est} hidden text-white/70 sm:block`}>
            Est. 2018 · San Fernando
          </p>
        </div>
      )}
    </Link>
  );
}

export function LogoLight({ showText = true, size = "md", className = "" }: LogoProps) {
  const config = sizes[size];

  return (
    <Link href="/" className={`group flex min-w-0 items-center gap-2.5 sm:gap-3 ${className}`}>
      <Image
        src="/images/logo.jpg"
        alt="DD's logo"
        width={config.icon}
        height={config.icon}
        className="shrink-0 rounded-full ring-2 ring-black/5 transition group-hover:scale-105"
        priority
      />
      {showText && (
        <div className="min-w-0">
          <p className={`${config.text} truncate font-bold text-brand-black`}>
            DD&apos;s
          </p>
          <p className={`${config.est} hidden text-stone-500 sm:block`}>
            Est. 2018 · San Fernando
          </p>
        </div>
      )}
    </Link>
  );
}
