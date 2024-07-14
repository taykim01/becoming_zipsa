import "./globals.css";
import type { Metadata } from "next";
import RecoilRootWrapper from "../recoil/recoil_wrapper";
import analyticsTags from "@/analytics";
import { GoogleAnalytics } from '@next/third-parties/google'
import Loading from "@/lib/loading";


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
        </body>
      </RecoilRootWrapper>
      <GoogleAnalytics gaId={analyticsTags.default} />
    </html>
  );
}
