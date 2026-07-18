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
    radial-gradient(ellipse 70% 45% at 8% -8%, color-mix(in srgb, ${theme.brandBright} 16%, transparent), transparent 55%),
    radial-gradient(ellipse 50% 35% at 96% 4%, color-mix(in srgb, ${theme.accent} 12%, transparent), transparent 48%),
    radial-gradient(ellipse 40% 30% at 50% 100%, color-mix(in srgb, ${theme.brand} 7%, transparent), transparent 60%),
    linear-gradient(180deg, ${theme.bg} 0%, color-mix(in srgb, ${theme.bg} 88%, ${theme.ink}) 100%);
}
::selection {
  background: color-mix(in srgb, ${theme.brand} 22%, transparent);
  color: var(--ink);
}`,
      }}
    />
  );
}
