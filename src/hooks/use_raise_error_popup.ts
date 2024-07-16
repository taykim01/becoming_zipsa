"use client";

import { useSetRecoilState } from "recoil";
import { errorPopupState } from "../recoil/error_popup";

export const useRaiseErrorPopup = () => {
  const setErrorPopup = useSetRecoilState(errorPopupState);
  
  return (message: string, title?: string) => {
    const popupTitle: string = title || "오류가 발생했어요.";
    setErrorPopup({
      open: true,
      title: popupTitle,
      children: message
    });
  };
};