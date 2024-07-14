import "./globals.css";
import type { Metadata } from "next";
import RecoilRootWrapper from "../recoil/recoil_wrapper";
import ClearSessionStorageOnExit from "@/utils/clear_session_storage_on_exit";
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
      <ClearSessionStorageOnExit />
      <GoogleAnalytics gaId={analyticsTags.default} />
    </html>
  );
}
