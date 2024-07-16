import "./globals.css";
import type { Metadata } from "next";
import RecoilRootWrapper from "../recoil/recoil_wrapper";
import { GoogleAnalytics } from '@next/third-parties/google'
import Loading from "@/lib/loading";
import Popup from "@/lib/popup";


export const metadata: Metadata = {
  title: "집사가 되。",
  description: "나만의 귀여운 고양이 키우기🐱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <RecoilRootWrapper>
        <body>
          {children}
          <Loading />
          <Popup.Error />
        </body>
      </RecoilRootWrapper>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_MEASUREMENT_ID || ""} />
    </html>
  );
}
