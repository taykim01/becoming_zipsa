"use client"

import { useState, useEffect } from "react"
import UpdateAge from "../../../../repository/v1.0.0/cat/update_age"
import { useRouter } from "next/navigation"
import React from "react"
import Popup from "../../../../lib/popup"
import { CatEvent } from "@/repository/v1.0.0/cat/cat"

export default function UpdateTime() {
    const update_age = new UpdateAge()

    const router = useRouter()
    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: ""
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
    }


    useEffect(() => {
        const interval = setInterval(() => {
            updateTime();
        }, 60000);

        return () => clearInterval(interval);
    }, []);


    return <Popup.Default
        open={errorPopup.open}
        onClose={() => setErrorPopup({ ...errorPopup, open: false })}
        title={errorPopup.title}
    >
        {errorPopup.children}
    </Popup.Default>
}