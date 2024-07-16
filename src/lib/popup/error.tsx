"use client"

import Popup from "./index";
import React from "react";
import { errorPopupState } from "../../recoil/error_popup";
import { useRecoilState } from "recoil";

export default function Error(){
    const [errorPopup, setErrorPopup] = useRecoilState(errorPopupState)
    return (
        <Popup.Default
            open={errorPopup.open}
            onClose={() => {
                setErrorPopup({ ...errorPopup, open: false });
                errorPopup.onClose && errorPopup.onClose();
            }}
            title={errorPopup.title || "오류가 발생했어요."}
        >
            {errorPopup.children}
        </Popup.Default>
    )
}