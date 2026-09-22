export function HomeMarquee({ items }: { items: string[] }) {
  if (!items?.length) return null;

  const row = (suffix: string, hidden: boolean) =>
    items.map((item, index) => (
      <span
        key={`${suffix}-${item}-${index}`}
        className="inline-flex items-center gap-5 px-4 sm:gap-6 sm:px-5"
        aria-hidden={hidden || undefined}
      >
        <span className="font-display text-sm font-semibold tracking-wide text-ink sm:text-base">
          {item}
        </span>
        <span
          className="inline-block h-1.5 w-1.5 rotate-45 bg-brand/55"
          aria-hidden
        />
      </span>
    ));

  return (
    <div
      className="home-marquee relative overflow-hidden border-y border-line/70 bg-white/80"
      aria-label="Programme themes"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-bg via-bg/80 to-transparent sm:w-16"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-bg via-bg/80 to-transparent sm:w-16"
        aria-hidden
      />
      <div className="marquee-track flex w-max items-center py-3.5 sm:py-4">
        <div className="flex items-center">{row("a", false)}</div>
        <div className="flex items-center" aria-hidden>
          {row("b", true)}
        </div>
      </div>
    </div>
  );
}
