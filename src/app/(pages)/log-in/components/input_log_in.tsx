"use client"

import Input from "@/lib/input";
import { useState } from "react";
import Components from ".";
import { useRouter } from "next/navigation";
import Button from "@/lib/button";
import CheckCatUseCase from "@/domain/use_case/cat/check_cat_use_case";
import EmailLogInUseCase from "@/domain/use_case/auth/email_log_in_use_case";
import Loading from "@/lib/loading";

export default function InputLogIn() {
    const router = useRouter()
    const check_cat_use_case = new CheckCatUseCase()
    const email_log_in_use_case = new EmailLogInUseCase()
    const [loading, setLoading] = useState<boolean>(false)


    const [logInData, setLogInData] = useState({
        email: "",
        password: ""
    })

    const setEmail = (email: string) => {
        setLogInData({ ...logInData, email })
    }

    const setPassword = (password: string) => {
        setLogInData({ ...logInData, password })
    }

    const logIn = async () => {
        setLoading(true)
        const response = await email_log_in_use_case.logIn(logInData.email, logInData.password)
        if (!response.success) {
            alert(response.message)
            setLoading(false)
            return
        }
        const checkCatRes = await check_cat_use_case.check()
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
                    <div className="font-fs-r text-gray-dark text-r16">|</div>
                    <Components.GoogleSignUpButton />
                </div>
            </div>
            <div className="absolute bottom-5 w-full">
                <Button.Default onClick={logIn}>로그인하기</Button.Default>
            </div>
            {loading && <Loading />}
        </>
    )
}