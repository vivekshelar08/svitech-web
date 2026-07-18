import Link from "next/link";

export function DonateStrip({
  headline,
  copy,
  amounts,
  donateHref,
  donateLabel,
}: {
  headline: string;
  copy: string;
  amounts: number[];
  donateHref: string;
  donateLabel: string;
}) {
  return (
    <section className="relative overflow-hidden" aria-labelledby="donate-strip-heading">
      <div className="absolute inset-0 mesh-warm" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="site-eyebrow">Give today</p>
          <h2
            id="donate-strip-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
          >
            {headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">{copy}</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {amounts.map((amount) => (
            <Link
              key={amount}
              href={`${donateHref}?amount=${amount}`}
              className="min-w-[6rem] border border-ink/10 bg-white/80 px-5 py-3.5 text-center font-display text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:shadow-md"
            >
              ₹{amount.toLocaleString("en-IN")}
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href={donateHref} className="btn-primary">
            {donateLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
