export function HomeMarquee({ items }: { items: string[] }) {
  if (!items?.length) return null;
  const loop = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden border-y border-line/70 bg-white/70"
      aria-label="Programme themes"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent sm:w-20" />
      <div className="marquee-track flex w-max items-center gap-0 py-3.5">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-6 px-5 font-display text-sm font-semibold tracking-wide text-ink sm:text-base"
          >
            <span>{item}</span>
            <span className="h-1 w-1 rounded-none bg-brand/50" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
