import type { Metadata } from "next";
import { Inter, PT_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Space_Grotesk({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="bg-black/80">{children}</main>
      </body>
    </html>
  );
}
