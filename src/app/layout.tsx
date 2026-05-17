import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://owlka.com";
const DEFAULT_TITLE = "Owlka — Claude Code on your phone";
const DEFAULT_DESCRIPTION =
  "Owlka gives you the full power of Claude Code on your phone. Build apps, websites, monitors, anything a developer could do, all from the comfort of your sofa.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Owlka",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "Owlka",
  authors: [{ name: "Owlka" }],
  keywords: [
    "Owlka",
    "Claude Code",
    "AI coding",
    "mobile development",
    "iOS",
    "Anthropic",
    "developer tools",
  ],
  openGraph: {
    type: "website",
    siteName: "Owlka",
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Owlka — Claude Code on your phone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/api/og"],
  },
  icons: {
    icon: "/icon.svg",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} antialiased`}>
      <body className="font-sans bg-bg text-text min-h-screen">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
