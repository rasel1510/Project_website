import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "BanglarMukh – Physics-Aware Multilingual Multimodal VL Benchmark | AAAI 2027",
  description:
    "BanglarMukh: A culturally and traditionally rooted benchmark for evaluating Large Vision Language Models on Bangladeshi tradition, dialects, and physics-aware reasoning. AAAI 2027.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: "#ffffff", color: "#1e293b" }}>
        {children}
      </body>
    </html>
  );
}
