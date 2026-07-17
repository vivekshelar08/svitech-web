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
  --line: color-mix(in srgb, ${theme.ink} 12%, transparent);
  --background: var(--bg);
  --foreground: var(--ink);
}
body {
  background-image:
    radial-gradient(ellipse 80% 50% at 10% -10%, color-mix(in srgb, ${theme.brandBright} 12%, transparent), transparent 55%),
    radial-gradient(ellipse 60% 40% at 100% 0%, color-mix(in srgb, ${theme.accent} 8%, transparent), transparent 50%),
    linear-gradient(180deg, ${theme.bg} 0%, color-mix(in srgb, ${theme.bg} 92%, ${theme.ink}) 100%);
}
::selection {
  background: color-mix(in srgb, ${theme.brand} 22%, transparent);
  color: var(--ink);
}`,
      }}
    />
  );
}
