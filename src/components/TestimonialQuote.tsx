import type { TestimonialQuote as TestimonialQuoteType } from "@/lib/site-settings-defaults";

export function TestimonialQuote({
  eyebrow,
  quote,
}: {
  eyebrow: string;
  quote: TestimonialQuoteType;
}) {
  if (!quote.text.trim()) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24" aria-label="Testimonial">
      <div className="relative overflow-hidden border border-line/70 bg-white/70 px-8 py-10 md:px-14 md:py-14">
        <div
          className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-brand via-brand-bright to-accent"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] leading-none text-brand/[0.07] md:text-[9rem]"
          aria-hidden
        >
          “
        </span>
        <p className="site-eyebrow relative">{eyebrow}</p>
        <blockquote className="relative mt-5">
          <p className="font-display text-xl font-medium leading-relaxed text-ink md:text-2xl md:leading-snug">
            {quote.text}
          </p>
          <footer className="mt-8 flex items-center gap-4">
            <span className="h-px w-10 bg-brand" aria-hidden />
            <cite className="not-italic">
              <span className="text-sm font-semibold text-ink">{quote.attribution}</span>
              {quote.role && (
                <span className="mt-0.5 block text-sm text-ink-muted">{quote.role}</span>
              )}
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
