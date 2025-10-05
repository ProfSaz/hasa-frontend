import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Nav/Footer";
import Header from "@/components/Nav/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HASA WaaS Platform Admin",
  description: "Admin dashboard for Aptos Wallet-as-a-Service Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
