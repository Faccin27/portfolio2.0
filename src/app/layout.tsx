import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FaccinDEV",
  description: "Portfólio FaccinDEV - Desenvolvedor Full Stack com foco em Next.js e TypeScript.",
  openGraph: {
    title: "FaccinDEV",
    description: "Portfólio FaccinDEV - Desenvolvedor Full Stack com foco em Next.js e TypeScript.",
    url: "https://faccindev.pro",
    siteName: "FaccinDEV",
    images: [
      {
        url: "/logo.png", 
        width: 1200,
        height: 630,
        alt: "Logo FaccinDEV",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FaccinDEV",
    description: "Portfólio FaccinDEV - Desenvolvedor Full Stack com foco em Next.js e TypeScript.",
    images: ["/logo.png"], 
  },
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
        {children}
      </body>
    </html>
  );
}
