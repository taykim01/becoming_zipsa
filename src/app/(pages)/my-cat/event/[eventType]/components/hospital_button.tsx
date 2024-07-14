"use client"

import Button from "@/lib/button";
import Popup from "@/lib/popup";
import { loadingState } from "@/recoil/loading";
import MedicateCat from "../../../../../../repository/v1.0.0/cat/medicate_cat";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

export default function HospitalButton() {
    const medicate_cat = new MedicateCat()


    const router = useRouter()
    const setLoading = useSetRecoilState(loadingState)
    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: ""
    })


    const medicate = async () => {
        setLoading(true)
        const response = await medicate_cat.medicate()
        if (!response.success) {
            setErrorPopup({
                open: true,
                title: "오류가 발생했어요!",
                children: response.message
            })
            return
        }
        setErrorPopup({
            open: true,
            title: "알림",
            children: response.message
        })
        router.push("/my-cat")
    }


    return (
        <>
        <Button.UserAction onClick={medicate} iconType="Injection" textColor="white">병원가기</Button.UserAction>
        <Popup.Default
                open={errorPopup.open}
                onClose={() => setErrorPopup({ ...errorPopup, open: false})}
                title={errorPopup.title}
            >
                {errorPopup.children}
            </Popup.Default>
        </>
    )
}