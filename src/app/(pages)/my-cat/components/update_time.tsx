"use client"

import { useState, useEffect } from "react"
import UpdateAge from "../../../../repository/v1.0.0/cat/update_age"
import { useRouter } from "next/navigation"
import React from "react"
import Popup from "../../../../lib/popup"
import { CatEvent } from "@/repository/v1.0.0/cat/cat"
import Button from "@/lib/button"
import { sendGAEvent } from "@next/third-parties/google"

export default function UpdateTime() {
    const update_age = new UpdateAge()

    const router = useRouter()
    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: "" as any
    })


    const updateTime = async () => {
        const response = await update_age.update();
        if (!response.success)
            setErrorPopup({
                open: true,
                title: "오류가 발생했어요!",
                children: response.message
            });
        const event = response.data as CatEvent;
        if (event === "disease" || event === "neutering") router.push(`my-cat/event/${event}`)
        else if (event === "suggest_pro") setErrorPopup({
            open: true,
            title: "고양이와 더 많은 시간을 보내고 싶으신가요?",
            children: <div className="flex flex-col w-full gap-3">
                <ul className="font-fs-r text-14 text-black-1">
                    <li>고양이의 성격을 구체화할 수 있어요</li>
                    <li>여러 고양이와 함께할 수 있어요</li>
                    <li>고양이가 먼저 말을 걸어요</li>
                    <br />
                    <li>고양이와 더 오래 시간을 보낼 수 있어요</li>
                    <li>집나간 고양이를 찾을 수 있어요</li>
                    <li>아픈 고양이를 살릴 수 있어요</li>
                    <br />
                    <li>다양한 사료와 장난감을 줄 수 있어요</li>
                    <li>놀아주는 방법이 추가돼요(긁어주기, 뽀뽀해주기)</li>
                    <li>고양이와 함께하는 이벤트가 추가돼요</li>
                </ul>
                <Button.Default onClick={() => {
                    sendGAEvent({ event: 'register_pro', value: 'registerd' });
                    router.push("my-cat/pro")
                }}>
                    프로 계정 예약하고 할인받기!
                </Button.Default>
            </div>
        })
    }


    useEffect(() => {
        const interval = setInterval(() => {
            updateTime();
        }, 60000);

        return () => clearInterval(interval);
    }, []);


    return <>
        <Popup.Default
            open={errorPopup.open}
            onClose={() => setErrorPopup({ ...errorPopup, open: false })}
            title={errorPopup.title}
        >
            {errorPopup.children}
        </Popup.Default>
    </>
}