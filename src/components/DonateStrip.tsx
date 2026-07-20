import Link from "next/link";

export function DonateStrip({
  eyebrow,
  headline,
  copy,
  amounts,
  donateHref,
  donateLabel,
}: {
  eyebrow: string;
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

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="site-eyebrow">{eyebrow}</p>
          <h2
            id="donate-strip-heading"
            className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl"
          >
            {headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">{copy}</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
          {amounts.map((amount) => (
            <Link
              key={amount}
              href={`${donateHref}?amount=${amount}`}
              className="min-h-12 border border-ink/10 bg-white/80 px-3 py-3.5 text-center font-display text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:shadow-md sm:min-w-[6rem] sm:px-5"
            >
              ₹{amount.toLocaleString("en-IN")}
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href={donateHref} className="btn-primary w-full sm:w-auto">
            {donateLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
