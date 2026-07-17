import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  href?: string;
  logoUrl: string;
  logoAlt: string;
  logoAriaLabel: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
  onClick?: () => void;
};

const sizes = {
  sm: { width: 160, height: 44, className: "h-9 w-auto md:h-10" },
  md: { width: 240, height: 66, className: "h-12 w-auto md:h-14" },
  lg: {
    width: 420,
    height: 116,
    className: "h-16 w-auto max-w-[min(100%,22rem)] sm:h-20 md:h-24 md:max-w-md",
  },
};

export function SiteLogo({
  href = "/",
  logoUrl,
  logoAlt,
  logoAriaLabel,
  size = "sm",
  className = "",
  priority = false,
  onClick,
}: SiteLogoProps) {
  const s = sizes[size];
  const image = (
    <Image
      src={logoUrl}
      alt={logoAlt}
      width={s.width}
      height={s.height}
      className={`${s.className} ${className}`}
      priority={priority}
    />
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 transition-opacity hover:opacity-90"
      onClick={onClick}
      aria-label={logoAriaLabel}
    >
      {image}
    </Link>
  );
}
