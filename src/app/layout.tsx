import type { Metadata } from "next";
import { Syne, IBM_Plex_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "SVITECH Foundation — Technology for Social Good",
    template: "%s · SVITECH Foundation",
  },
  description:
    "SVITECH Foundation bridges communities with digital skills, open education, and technology that serves people first.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${ibmPlex.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <div className="site-grain" aria-hidden />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
