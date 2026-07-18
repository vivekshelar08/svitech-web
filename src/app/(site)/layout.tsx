import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyDonateBar } from "@/components/StickyDonateBar";
import { SiteTheme } from "@/components/SiteTheme";
import { getPrograms } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 60;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, programs] = await Promise.all([getSiteSettings(), getPrograms()]);

  return (
    <>
      <SiteTheme theme={settings.theme} />
      <Header
        general={settings.general}
        navigation={settings.navigation}
        programs={programs.map((p) => ({
          slug: p.slug,
          name: p.name,
          summary: p.summary,
        }))}
      />
      <main className="flex-1">{children}</main>
      <Footer general={settings.general} footer={settings.footer} />
      <StickyDonateBar
        enabled={settings.navigation.stickyDonate.enabled}
        message={settings.navigation.stickyDonate.message}
        ctaLabel={settings.navigation.stickyDonate.ctaLabel}
        ctaHref={settings.navigation.stickyDonate.ctaHref}
      />
    </>
  );
}
