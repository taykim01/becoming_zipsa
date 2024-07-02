"use client"

import Input from "@/lib/input";
import { useState } from "react";
import Components from ".";
import { useRouter } from "next/navigation";
import Button from "@/lib/button";

export default function InputLogIn() {
    const router = useRouter()
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

    const logIn = () => {
        router.push("/my-cat")
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
                <Components.SignUpButton />
            </div>
            <div className="absolute bottom-10 w-full">
                <Button.Default onClick={logIn}>로그인하기</Button.Default>
            </div>
        </>
    )
}