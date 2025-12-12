import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: `${site.name} — Video Editor`,
  description: site.tagline,
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: `${site.name} — Video Editor`,
    description: site.tagline,
    type: "website",
    images: [{ url: "/og.svg" }]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
