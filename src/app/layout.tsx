import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "프론트엔드 개발자 박지찬 | 포트폴리오",
  description:
    "React, Next.js 기반 웹 서비스 개발과 토론하는것을 좋아하는 프론트엔드 개발자 박지찬의 포트폴리오입니다.",
  keywords: "프론트엔드, React, Next.js, 웹 개발자, 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <h1 className="sr-only">프론트엔드 개발자 박지찬의 포트폴리오</h1>
        <div className="bg-black min-h-screen ">
          <div className="text-white relative">{children}</div>
        </div>
      </body>
    </html>
  );
}
