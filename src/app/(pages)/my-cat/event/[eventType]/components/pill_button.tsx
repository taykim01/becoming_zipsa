"use client"

import Button from "@/lib/button";
import Popup from "@/lib/popup";
import { loadingState } from "@/recoil/loading";
import NeuterCat from "@/repository/v1.0.0/cat/neuter_cat";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function PillButton() {
    const neuter_cat = new NeuterCat()


    const router = useRouter()
    const setLoading = useSetRecoilState(loadingState)
    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: ""
    })


    const medicate = async () => {
        setLoading(true)
        const response = await neuter_cat.neuter()
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
            <Button.UserAction onClick={medicate} iconType="Pill" textColor="white">약 주기</Button.UserAction>
            <Popup.Default
                open={errorPopup.open}
                onClose={() => setErrorPopup({ ...errorPopup, open: false })}
                title={errorPopup.title}
            >
                {errorPopup.children}
            </Popup.Default>
        </>
    )
}