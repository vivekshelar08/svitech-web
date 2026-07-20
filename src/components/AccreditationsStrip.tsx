import Image from "next/image";
import Link from "next/link";
import type { Accreditation, PartnerLogo } from "@/lib/site-settings-defaults";

export function AccreditationsStrip({
  accreditationsEyebrow,
  accreditationsHeadline,
  accreditations,
  partnersEyebrow,
  partners,
}: {
  accreditationsEyebrow: string;
  accreditationsHeadline: string;
  accreditations: Accreditation[];
  partnersEyebrow: string;
  partners: PartnerLogo[];
}) {
  if (accreditations.length === 0 && partners.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden border-y border-line"
      aria-labelledby="accreditations-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_0%,rgba(14,107,92,0.07),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        {accreditations.length > 0 && (
          <div>
            <p className="site-eyebrow">{accreditationsEyebrow}</p>
            <h2
              id="accreditations-heading"
              className="mt-3 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl md:text-3xl"
            >
              {accreditationsHeadline}
            </h2>
            <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
              {accreditations.map((item, index) => (
                <li
                  key={`${item.name}-${index}`}
                  className="panel-lift group relative overflow-hidden border border-line/70 bg-white/70 p-5"
                >
                  <span className="absolute right-3 top-3 font-display text-3xl font-bold text-brand/[0.08] transition group-hover:text-brand/15">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.logo ? (
                    <div className="relative h-10 w-16">
                      <Image
                        src={item.logo}
                        alt=""
                        fill
                        className="object-contain object-left"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center border border-brand/25 bg-brand/8 text-brand">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path
                          d="M2.5 7.5L5.5 10.5L11.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="square"
                        />
                      </svg>
                    </div>
                  )}
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {partners.length > 0 && (
          <div className={accreditations.length > 0 ? "mt-14 border-t border-line pt-12" : ""}>
            <p className="site-eyebrow text-center">{partnersEyebrow}</p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {partners.map((partner, index) => {
                const inner = partner.image ? (
                  <span className="flex h-14 min-w-[7rem] items-center justify-center border border-line/80 bg-white/80 px-4 py-2 transition hover:border-brand/35 hover:bg-white">
                    <span className="relative h-8 w-24">
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </span>
                  </span>
                ) : (
                  <span className="block border border-line/80 bg-white/80 px-5 py-2.5 text-sm font-semibold text-ink-muted transition hover:border-brand/35 hover:bg-white hover:text-brand">
                    {partner.name}
                  </span>
                );
                return (
                  <li key={`${partner.name}-${index}`}>
                    {partner.href ? (
                      <Link href={partner.href} className="block">
                        {inner}
                      </Link>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
