"use client"

import { useLoadingRouter } from "@/hooks/use_loading_router"
import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup"
import Button from "@/lib/button"
import { loadingState } from "@/recoil/loading"
import ReadCat from "@/repository/v1.0.0/cat/read_cat"
import GoogleLogIn from "@/repository/v1.0.0/user/google_log_in"
import { useSetRecoilState } from "recoil"

export default function GoogleLogInButton() {
    const google_log_in = new GoogleLogIn()
    const read_cat = new ReadCat()


    const router = useLoadingRouter()
    const raiseErrorPopup = useRaiseErrorPopup()
    const setLoading = useSetRecoilState(loadingState)


    const googleLogIn = async () => {
        try {
            setLoading(true)
            const response = await google_log_in.logIn()
            if (!response.success) {
                raiseErrorPopup(response.message)
                return
            }
            const checkCatRes = await read_cat.read()
            if (checkCatRes.data === "no_cat") router("/adopt-cat")
            else router("/my-cat")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button.Text onClick={googleLogIn}>
            구글 로그인하기
        </Button.Text>
    )
}