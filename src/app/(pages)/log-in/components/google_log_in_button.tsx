"use client"

import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup"
import Button from "@/lib/button"
import ReadCat from "@/repository/v1.0.0/cat/read_cat"
import GoogleLogIn from "@/repository/v1.0.0/user/google_log_in"
import { useRouter } from "next/navigation"

export default function GoogleLogInButton() {
    const google_log_in = new GoogleLogIn()
    const read_cat = new ReadCat()

    const router = useRouter()
    const raiseErrorPopup = useRaiseErrorPopup()

    const googleLogIn = async () => {
        const response = await google_log_in.logIn()
        if (!response.success) {
            raiseErrorPopup(response.message)
            return
        }
        const checkCatRes = await read_cat.read()
        if (checkCatRes.data === "no_cat") router.push("/adopt-cat")
        else router.push("/my-cat")
    }

    return (
        <Button.Text onClick={googleLogIn}>
            구글 로그인하기
        </Button.Text>
    )
}