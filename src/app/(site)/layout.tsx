import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
      <Header general={settings.general} navigation={settings.navigation} />
      <main className="flex-1">{children}</main>
      <Footer general={settings.general} footer={settings.footer} />
    </>
  );
}
