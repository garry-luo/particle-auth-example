import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ParticleAuthkit } from "../components/AuthKit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Particle Auth 登入範例",
  description: "使用 Particle Network 的第三方登入範例應用程式",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <ParticleAuthkit>{children}</ParticleAuthkit>
      </body>
    </html>
  );
}
