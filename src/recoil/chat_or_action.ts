import { atom } from "recoil";

export const chatOrActionState = atom({
    key: "chatOrAction",
    default: "chat" as "chat" | "action"
});