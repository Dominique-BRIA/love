import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

const script = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Pour Divine - Une Déclaration Unique",
  description: "À celle qui illumine mon monde. Une déclaration de flamme interactive et poétique.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable} ${script.variable} scroll-smooth`}>
      <body className="bg-[#0f0c1b] text-[#f3e8ff] font-sans antialiased selection:bg-pink-500 selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
