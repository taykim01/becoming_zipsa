"use client"

import Button from "@/lib/button";
import Popup from "@/lib/popup";
import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup";
import GoogleSignUp from "@/repository/v1.0.0/user/google_sign_up";
import { useRouter } from "next/navigation";

export default function SignUpPopup(props: {
    open: boolean,
    onClose: () => any
}) {
    const google_sign_up = new GoogleSignUp()


    const router = useRouter()
    const raiseErrorPopup = useRaiseErrorPopup()


    const googleSignUp = async () => {
        const response = await google_sign_up.signUp()
        if (!response.success) {
            raiseErrorPopup(response.message)
            return
        }
        router.push("/sign-up/google")
    }


    return (
        <Popup.Default
            title="회원가입 방법 선택하기"
            open={props.open}
            onClose={props.onClose}
        >
            <div className="flex flex-col gap-3 pt-10">
                <Button.Default onClick={googleSignUp}>구글 회원가입</Button.Default>
                <Button.Default onClick={() => router.push("/sign-up/email")}>이메일 회원가입</Button.Default>
            </div>
        </Popup.Default>
    )
}