import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="kr">
      <body>
        {children}
      </body>
    </html>
  );
}
