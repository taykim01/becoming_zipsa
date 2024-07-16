"use client"

import Input from "@/lib/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/lib/button";
import GoogleSignUp from "@/repository/v1.0.0/user/google_sign_up";
import Popup from "@/lib/popup";
import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup";

export default function InputSignUp() {
    const sign_up = new GoogleSignUp()


    const router = useRouter()
    const raiseErrorPopup = useRaiseErrorPopup()
    const [name, setName] = useState("")
    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: ""
    })


    const signUp = async () => {
        const verifyRes = await sign_up.verifyInput(name)
        if (!verifyRes.success) {
            raiseErrorPopup(verifyRes.message)
            return
        }
        const createUserRes = await sign_up.createUser(name)
        if (!createUserRes.success) {
            raiseErrorPopup(createUserRes.message)
            return
        }
        setErrorPopup({
            open: true,
            title: "회원가입이 완료되었어요.",
            children: "이제 고양이를 입양해보아요!"
        })
    }
    

    return (
        <>
            <div className="relative flex flex-col items-center w-full h-full">
                <div className="flex flex-col gap-5 w-full items-center h-full">
                    <Input.Text
                        title="이름"
                        placeholder="이름을 입력해주세요."
                        onChange={setName}
                        onEnter={signUp}
                    />
                </div>
                <Button.Default onClick={signUp}>회원가입하기</Button.Default>
            </div>
            <Popup.Default
                open={errorPopup.open}
                onClose={() => {
                    setErrorPopup({ ...errorPopup, open: false })
                    errorPopup.title === "회원가입이 완료되었어요." && router.push("/adopt-cat")
                }}
                title={errorPopup.title}
            >
                {errorPopup.children}
            </Popup.Default>
        </>
    )
}