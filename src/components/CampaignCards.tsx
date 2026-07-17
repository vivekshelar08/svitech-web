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
    <section className="bg-bg-deep text-surface" aria-labelledby="campaigns-heading">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-bright">
          {eyebrow}
        </p>
        <h2
          id="campaigns-heading"
          className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl"
        >
          {headline}
        </h2>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {campaigns.map((campaign) => (
            <li key={campaign.title}>
              <Link
                href={campaign.href}
                className="group flex h-full flex-col overflow-hidden border border-white/10 bg-white/5 transition hover:border-brand-bright/40 hover:bg-white/8"
              >
                {campaign.image && (
                  <div className="relative aspect-[16/7] overflow-hidden">
                    <Image
                      src={campaign.image}
                      alt=""
                      fill
                      className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 to-transparent" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-brand-bright">
                    {campaign.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70 md:text-base">
                    {campaign.copy}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-brand-bright">
                    {campaign.cta}
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
