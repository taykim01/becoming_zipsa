import { atom } from "recoil";

export const popupErrorState = atom({
    key: "popup_error",
    default: {
        open: false,
        message: ""
    }
});