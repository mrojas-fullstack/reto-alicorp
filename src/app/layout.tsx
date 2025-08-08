import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MSWInit } from "@/components/msw-init";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Chat MR | Miguel Rojas",
  description: "Prueba técnica para el puesto de Frontend Developer en Alicorp",
  keywords: "chat, prueba, frontend, developer, alicorp",
  openGraph: {
    title: "Chat MR | Miguel Rojas",
    description: "Prueba técnica para el puesto de Frontend Developer en Alicorp",
    url: "https://www.clubsportbarrio.com",
    type: "website",
    images: [{
      url: "https://multimediaclubsportbarrio.s3.amazonaws.com/banners/desktop/BanDeskEquipo.png",
    }],
  },
  verification: {
    other: {capable: "true"}
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.className} ${geistMono.className} dark`}>
        <MSWInit />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
