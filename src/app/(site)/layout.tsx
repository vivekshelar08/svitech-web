import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SitePopup } from "@/components/SitePopup";
import { StickyDonateBar } from "@/components/StickyDonateBar";
import { SiteTheme } from "@/components/SiteTheme";
import { getSiteSettings } from "@/lib/site-settings";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <SiteTheme theme={settings.theme} />
      <Header
        key={`nav-${settings.navigation.primaryLinks.map((l) => l.href).join("|")}`}
        general={settings.general}
        navigation={settings.navigation}
      />
      <main className="flex-1">{children}</main>
      <Footer general={settings.general} footer={settings.footer} />
      <StickyDonateBar
        enabled={settings.navigation.stickyDonate.enabled}
        message={settings.navigation.stickyDonate.message}
        ctaLabel={settings.navigation.stickyDonate.ctaLabel}
        ctaHref={settings.navigation.stickyDonate.ctaHref}
      />
      <SitePopup popup={settings.popup} />
    </>
  );
}
