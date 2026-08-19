import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  title,
  description: site.tagline,
  openGraph: {
    title,
    description: site.tagline,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
