"use client"

import Button from "@/lib/button";
import { loadingState } from "@/recoil/loading";
import MedicateCat from "../../../../../../repository/v1.0.0/cat/medicate_cat";
import { useSetRecoilState } from "recoil";
import { errorPopupState } from "@/recoil/error_popup";
import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup";
import { useLoadingRouter } from "@/hooks/use_loading_router";

export default function HospitalButton() {
    const medicate_cat = new MedicateCat()


    const router = useLoadingRouter()
    const setLoading = useSetRecoilState(loadingState)
    const setErrorPopup = useSetRecoilState(errorPopupState)
    const raiseErrorPopup = useRaiseErrorPopup()


    const medicate = async () => {
        setLoading(true)
        const response = await medicate_cat.medicate()
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
        <Button.UserAction onClick={medicate} iconType="Pill" textColor="white">병원 가기</Button.UserAction>
    )
}