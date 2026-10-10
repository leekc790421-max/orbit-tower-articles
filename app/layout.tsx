import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://articles.xingdeng.tw"),
  title: "Orbit Tower 未來企業趨勢文章",
  description: "探索 AI 數位展示館、3D 品牌展示、沉浸式體驗的未來趨勢。Orbit Tower 打造下一代企業數位總部。",
  keywords: [
    "Orbit Tower",
    "AI數位展示館",
    "3D網站",
    "沉浸式體驗",
    "企業官網",
    "Digital Headquarters",
    "AI接待員",
    "品牌展示",
  ],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://articles.xingdeng.tw",
    siteName: "Orbit Tower 未來企業趨勢",
    title: "Orbit Tower 未來企業趨勢文章",
    description: "探索 AI 數位展示館、3D 品牌展示、沉浸式體驗的未來趨勢。",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>
        {children}
      </body>
    </html>
  );
}
