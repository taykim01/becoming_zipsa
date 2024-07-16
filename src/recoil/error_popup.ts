import { atom } from "recoil";

interface ErrorPopupState {
    children: any;
    open: boolean;
    title?: string;
    onClose?: () => void;
}

export const errorPopupState = atom<ErrorPopupState>({
    key: "error_popup",
    default: {
        open: false,
        title: "",
        children: ""
    }
});