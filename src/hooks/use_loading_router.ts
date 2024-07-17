"use client";


import { useSetRecoilState } from "recoil";
import { loadingState } from "../recoil/loading";
import { useRouter } from "next/navigation";


export const useLoadingRouter = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);

  return (routerLink: string) => {
    setLoading(true);
    setTimeout(() => {
      routerLink === "back"
        ? router.back()
        : router.push(routerLink)
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }, 800);
  };
};