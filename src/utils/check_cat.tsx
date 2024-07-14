"use client"

import Popup from "@/lib/popup"
import ReadCat from "@/repository/v1.0.0/cat/read_cat"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function CheckCat(props: {
    for: "yes_cat" | "no_cat",
    response: "route" | "alert" | "both",
    content: string
}) {
    const read_cat = new ReadCat()


    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: ""
    })
    const router = useRouter()


    const checkCat = async () => {
        const response = await read_cat.read()
        if (response.success) return
        if (response.data === props.for) {
            if (props.response === "route") router.push(props.content)
            else setErrorPopup({
                open: true,
                title: "고양이가 없어요.",
                children: "고양이를 입양하러 가보아요!."
            });
        }
    }


    useEffect(() => {
        checkCat()
    }, [])


    return (
        <>
            <Popup.Default
                open={errorPopup.open}
                onClose={() => {
                    setErrorPopup({ ...errorPopup, open: false });
                    props.response === "both" && router.push(props.content)
                }}
                title={errorPopup.title}
            >
                {errorPopup.children}
            </Popup.Default>
        </>
    )
}