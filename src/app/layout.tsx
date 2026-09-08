import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Footer, Header, PreviewBar } from "@/components/chrome";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://toll-brothers-preview.netlify.app"),
  title: "Toll Brothers luxury communities (preview)",
  description:
    "Preview studio for Toll Brothers, America's luxury home builder since 1967. Communities, floor plans, quick move-in inventory, and Designer Appointed Collections. Not live on tollbrothers.com.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <div className="grain" aria-hidden />
        <PreviewBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
