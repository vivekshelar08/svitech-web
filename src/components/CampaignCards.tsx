import Image from "next/image";
import Link from "next/link";
import type { CampaignCard } from "@/lib/site-settings-defaults";

export function CampaignCards({
  eyebrow,
  headline,
  campaigns,
}: {
  eyebrow: string;
  headline: string;
  campaigns: CampaignCard[];
}) {
  if (campaigns.length === 0) return null;

  return (
    <section className="relative overflow-hidden text-surface" aria-labelledby="campaigns-heading">
      <div className="absolute inset-0 mesh-deep" aria-hidden />
      <div
        className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand-bright/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="site-eyebrow-bright text-[0.7rem] font-bold uppercase tracking-[0.18em]">
          {eyebrow}
        </p>
        <h2
          id="campaigns-heading"
          className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-white md:text-4xl"
        >
          {headline}
        </h2>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {campaigns.map((campaign) => (
            <li key={campaign.title}>
              <Link
                href={campaign.href}
                className="panel-lift group relative flex h-full min-h-[16rem] flex-col overflow-hidden border border-white/10 bg-white/[0.04]"
              >
                {campaign.image && (
                  <div className="absolute inset-0">
                    <Image
                      src={campaign.image}
                      alt=""
                      fill
                      className="object-cover opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-50"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/75 to-bg-deep/40" />
                  </div>
                )}
                <div className="relative flex flex-1 flex-col justify-end p-6 md:p-8">
                  <span className="mb-4 h-0.5 w-10 bg-gradient-to-r from-brand-bright to-accent transition-all duration-300 group-hover:w-16" />
                  <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                    {campaign.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                    {campaign.copy}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bright">
                    {campaign.cta}
                    <span
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
