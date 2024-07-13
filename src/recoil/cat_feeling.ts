import { atom } from "recoil";

export const catFeelingState = atom({
    key: "cat_feeling",
    default: "negative"
});