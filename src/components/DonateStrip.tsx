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
    <section
      className="bg-accent-soft"
      aria-labelledby="donate-strip-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="donate-strip-heading"
            className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
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
              className="min-w-[5.5rem] border border-line bg-white px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
            >
              ₹{amount.toLocaleString("en-IN")}
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={donateHref}
            className="inline-block bg-accent px-8 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {donateLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
