"use client"

import Button from "@/lib/button"
import Popup from "@/lib/popup"
import ReadCat from "@/repository/v1.0.0/cat/read_cat"
import GoogleLogIn from "@/repository/v1.0.0/user/google_log_in"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function GoogleSignUpButton() {
    const google_log_in = new GoogleLogIn()
    const read_cat = new ReadCat()

    const router = useRouter()
    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: ""
    })

    const googleLogIn = async () => {
        const response = await google_log_in.logIn()
        if (!response.success) {
            setErrorPopup({
                open: true,
                title: "오류가 발생했어요!",
                children: response.message
            })
            return
        }
        const checkCatRes = await read_cat.read()
        if (checkCatRes.data === "no_cat") router.push("/adopt-cat")
        else router.push("/my-cat")
    }

    return (
        <>
        <Button.Text onClick={googleLogIn}>
            구글 로그인하기
        </Button.Text>
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