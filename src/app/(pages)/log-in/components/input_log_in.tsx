"use client"

import Input from "@/lib/input";
import { useState } from "react";
import Components from ".";
import { useRouter } from "next/navigation";
import Button from "@/lib/button";
import EmailLogIn from "@/repository/v1.0.0/user/email_log_in";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/recoil/loading";
import ReadCat from "@/repository/v1.0.0/cat/read_cat";
import Popup from "@/lib/popup";

export default function InputLogIn() {
    const email_log_in = new EmailLogIn()
    const read_cat = new ReadCat()
    


    const router = useRouter()
    const setLoading = useSetRecoilState(loadingState)
    const [logInData, setLogInData] = useState({
        email: "",
        password: ""
    })
    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: ""
    })


    const setEmail = (email: string) => setLogInData({ ...logInData, email })
    const setPassword = (password: string) => setLogInData({ ...logInData, password })

    
    const logIn = async () => {
        setLoading(true)
        const response = await email_log_in.logIn(logInData.email, logInData.password)
        if (!response.success) {
            setErrorPopup({
                open: true,
                title: "오류가 발생했어요!",
                children: response.message
            })
            setLoading(false)
            return
        }
        const checkCatRes = await read_cat.read()
        if (checkCatRes.data === "no_cat") router.push("/adopt-cat")
        else router.push("/my-cat")
        setLoading(false)
    }

    return (
        <>
            <div className="flex flex-col gap-5 w-full items-center">
                <div className="flex flex-col gap-3 w-full">
                    <Input.Text
                        onChange={setEmail}
                        type="email"
                        placeholder="이메일을 입력해주세요."
                        onEnter={logIn}
                    />
                    <Input.Text
                        onChange={setPassword}
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        onEnter={logIn}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Components.SignUpButton />
                    <div className="font-fs-r text-gray-500 text-16">|</div>
                    <Components.GoogleSignUpButton />
                </div>
            </div>
            <div className="absolute bottom-5 w-full">
                <Button.Default onClick={logIn}>로그인하기</Button.Default>
            </div>
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