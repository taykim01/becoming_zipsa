import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";

const freesentation = localFont({
  src: "../fonts/Freesentation.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-freesentation",
});

export const metadata: Metadata = {
  title: "집사가 되.",
  description: "Stardenburdenhardenbart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${freesentation.variable}`}>
      <body className={freesentation.className}>
        {children}
      </body>
    </html>
  );
}
