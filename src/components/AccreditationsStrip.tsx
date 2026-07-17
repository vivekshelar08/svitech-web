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
    <section className="border-y border-line bg-surface" aria-labelledby="accreditations-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        {accreditations.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              {accreditationsEyebrow}
            </p>
            <h2
              id="accreditations-heading"
              className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl"
            >
              {accreditationsHeadline}
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {accreditations.map((item) => (
                <li
                  key={item.name}
                  className="border border-line bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                    ✓
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {partners.length > 0 && (
          <div className={accreditations.length > 0 ? "mt-14 border-t border-line pt-12" : ""}>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              {partnersEyebrow}
            </p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {partners.map((partner) => {
                const inner = (
                  <span className="block rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-muted transition hover:border-brand/30 hover:text-brand">
                    {partner.name}
                  </span>
                );
                return (
                  <li key={partner.name}>
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
