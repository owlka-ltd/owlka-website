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

export const metadata: Metadata = {
  metadataBase: new URL("https://owlka.com"),
  title: "Owlka — Claude Code on your phone",
  description:
    "Owlka gives you the full power of Claude Code on your phone. Build apps, websites, monitors, anything a developer could do, all from the comfort of your sofa.",
  openGraph: {
    title: "Owlka — Claude Code on your phone",
    description:
      "Build websites, build apps, set up persistent monitoring, connect to APIs and databases. From the comfort of your sofa.",
    url: "https://owlka.com",
    siteName: "Owlka",
    images: ["/owlka-mark.svg"],
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
