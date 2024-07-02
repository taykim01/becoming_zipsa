"use client"

import Input from "@/lib/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/lib/button";

export default function InputSignUp() {
    const router = useRouter()
    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
        passwordCheck: "",
        name: ""
    })

    const setEmail = (email: string) => {
        setSignUpData({ ...signUpData, email })
    }

    const setPassword = (password: string) => {
        setSignUpData({ ...signUpData, password })
    }

    const setPasswordCheck = (passwordCheck: string) => {
        setSignUpData({ ...signUpData, passwordCheck })
    }

    const setName = (name: string) => {
        setSignUpData({ ...signUpData, name })
    }

    const signUp = () => {
        router.push("/adopt-cat")
    }

    return (
        <div className="relative flex flex-col items-center w-full h-full">
            <div className="flex flex-col gap-5 w-full items-center h-full">
                <Input.Text
                    title="이메일"
                    placeholder="이메일을 입력해주세요."
                    onChange={setEmail}
                    onEnter={signUp}
                />
                <Input.Text
                    title="비밀번호"
                    placeholder="비밀번호를 입력해주세요."
                    onChange={setPassword}
                    onEnter={signUp}
                />
                <Input.Text
                    title="비밀번호 확인"
                    placeholder="비밀번호를 다시 입력해주세요."
                    onChange={setPasswordCheck}
                    onEnter={signUp}
                />
                <Input.Text
                    title="이름"
                    placeholder="이름을 입력해주세요."
                    onChange={setName}
                    onEnter={signUp}
                />
            </div>
            <div className="absolute bottom-0 w-full">
                <Button.Default onClick={signUp}>회원가입하기</Button.Default>
            </div>
        </div>
    )
}