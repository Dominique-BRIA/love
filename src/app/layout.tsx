import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://divine-flamme.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pour Divine — Une déclaration sincère",
  description:
    "Un site doux, élégant et interactif pour déclarer une flamme à Divine.",
  openGraph: {
    title: "Pour Divine — Une déclaration sincère",
    description:
      "Un petit coin d’internet créé avec soin pour Divine, avec des mots vrais et beaucoup de douceur.",
    images: [
      {
        url: "/divine-og.svg",
        width: 1200,
        height: 630,
        alt: "Pour Divine, une déclaration sincère",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pour Divine — Une déclaration sincère",
    description: "Une déclaration élégante, tendre et interactive pour Divine.",
    images: ["/divine-og.svg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-[#140612] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
