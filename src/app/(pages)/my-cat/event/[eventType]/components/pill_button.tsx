"use client"

import { useLoadingRouter } from "@/hooks/use_loading_router";
import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup";
import Button from "@/lib/button";
import { errorPopupState } from "@/recoil/error_popup";
import { loadingState } from "@/recoil/loading";
import NeuterCat from "@/repository/v1.0.0/cat/neuter_cat";
import { useSetRecoilState } from "recoil";

export default function PillButton() {
    const neuter_cat = new NeuterCat()


    const router = useLoadingRouter()
    const setLoading = useSetRecoilState(loadingState)
    const setErrorPopup = useSetRecoilState(errorPopupState)
    const raiseErrorPopup = useRaiseErrorPopup()


    const neuter = async () => {
        setLoading(true)
        const response = await neuter_cat.neuter()
        if (!response.success) {
            raiseErrorPopup(response.message)
            return
        }
        setErrorPopup({
            open: true,
            title: "알림",
            children: response.message
        })
        router("/my-cat")
    }

    return (
        <Button.UserAction onClick={neuter} iconType="Injection" textColor="white">병원 가기 주기</Button.UserAction>
    )
}