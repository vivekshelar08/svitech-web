import type { SiteSettings } from "@/lib/site-settings-defaults";

export function SiteTheme({ theme }: { theme: SiteSettings["theme"] }) {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `:root {
  --bg: ${theme.bg};
  --bg-deep: ${theme.bgDeep};
  --ink: ${theme.ink};
  --ink-muted: ${theme.inkMuted};
  --brand: ${theme.brand};
  --brand-bright: ${theme.brandBright};
  --accent: ${theme.accent};
  --accent-soft: ${theme.accentSoft};
  --surface: ${theme.surface};
  --grove: ${theme.accent};
  --line: color-mix(in srgb, ${theme.ink} 14%, transparent);
  --background: var(--bg);
  --foreground: var(--ink);
}
body {
  background-color: ${theme.bg};
  background-image:
    radial-gradient(ellipse 80% 50% at 0% 0%, color-mix(in srgb, ${theme.accent} 10%, transparent), transparent 55%),
    radial-gradient(ellipse 60% 40% at 100% 8%, color-mix(in srgb, ${theme.brand} 12%, transparent), transparent 50%),
    linear-gradient(180deg, ${theme.bg} 0%, color-mix(in srgb, ${theme.bg} 92%, ${theme.ink}) 100%),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 23px,
      color-mix(in srgb, ${theme.ink} 2.5%, transparent) 24px
    );
}
::selection {
  background: color-mix(in srgb, ${theme.brand} 28%, transparent);
  color: var(--ink);
}`,
      }}
    />
  );
}
