"use client"

import GoogleLogInUseCase from "@/domain/use_case/auth/google_log_in_use_case"
import CheckCatUseCase from "@/domain/use_case/cat/check_cat_use_case"
import { useRouter } from "next/navigation"

export default function GoogleSignUpButton() {
    const google_log_in_use_case = new GoogleLogInUseCase()
    const check_cat_use_case = new CheckCatUseCase()

    const router = useRouter()
    
    const googleLogIn = async () => {
        const response = await google_log_in_use_case.logIn()
        if (!response.success) {
            alert(response.message)
            return
        }
        const checkCatRes = await check_cat_use_case.check()
        if (checkCatRes.data === "no_cat") router.push("/adopt-cat")
        else router.push("/my-cat")
    }

    return (
        <div
            className="font-fs-r text-gray-dark text-r16 cursor-pointer"
            onClick={googleLogIn}
        >
            구글 로그인하기
        </div>
    )
}