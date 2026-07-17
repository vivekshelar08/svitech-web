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
      <div className="relative border-l-4 border-brand bg-white/60 px-8 py-10 md:px-12 md:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{eyebrow}</p>
        <blockquote className="mt-4">
          <p className="font-display text-xl font-medium leading-relaxed text-ink md:text-2xl">
            &ldquo;{quote.text}&rdquo;
          </p>
          <footer className="mt-6">
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
