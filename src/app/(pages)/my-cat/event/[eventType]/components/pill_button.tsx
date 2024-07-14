"use client"

import Button from "@/lib/button";
import Popup from "@/lib/popup";
import { Cat } from "@/repository/v1.0.0/cat/cat";
import ReadCat from "@/repository/v1.0.0/cat/read_cat";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PillButton() {
    const read_cat = new ReadCat()

    const router = useRouter()

    const medicate = async () => {
        const message = catData.name + "에게 약을 주었어요."
        setErrorPopup({
            open: true,
            title: "알림",
            children: message
        })
        router.push("/my-cat")
    }

    const [catData, setCatData] = useState({} as Cat)
    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: ""
    })

    const getCatData = async () => {
        const response = await read_cat.read();
        if (!response.success) {
            setErrorPopup({
                open: true,
                title: "오류가 발생했어요!",
                children: response.message
            });
            return;
        }
        setCatData(response.data)
    }

    useEffect(() => {
        getCatData()
    }, [])

    return (
        <>
        <Button.UserAction onClick={medicate} iconType="Pill" textColor="white">약 주기</Button.UserAction>
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