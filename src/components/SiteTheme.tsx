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
  background-color: #ffffff;
  background-image: none;
}
::selection {
  background: color-mix(in srgb, ${theme.brand} 28%, transparent);
  color: var(--ink);
}`,
      }}
    />
  );
}
