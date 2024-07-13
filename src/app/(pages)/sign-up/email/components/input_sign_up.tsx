"use client"

import Input from "@/lib/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/lib/button";
import Loading from "@/lib/loading";
import EmailSignUp from "@/repository/v1.0.0/user/email_sign_up";

export default function InputSignUp() {

    const sign_up = new EmailSignUp()
    const router = useRouter()
    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
        passwordCheck: "",
        name: ""
    })
        const [loading, setLoading] = useState<boolean>(false)
    

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

    const signUp = async () => {
        setLoading(true)
        const verifyRes = await sign_up.verifyInput(signUpData.email, signUpData.password, signUpData.passwordCheck, signUpData.name)
        if (!verifyRes.success) {
            alert(verifyRes.message)
            setLoading(false)
            return
        }
        const signUpRes = await sign_up.signUp()
        if (!signUpRes.success) {
            alert(signUpRes.message)
            setLoading(false)
            return
        }
        const createUserRes = await sign_up.createUser()
        if (!createUserRes.success) {
            await sign_up.deleteAuth()
            alert(createUserRes.message)
            setLoading(false)
            return
        }
        alert("회원가입에 성공했습니다.")
        router.push("/adopt-cat")
        setLoading(false)
    }

    return (
        <>
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
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    onChange={setPassword}
                    onEnter={signUp}
                    info="알파벳, 특수문자, 숫자 포함 6자 이상으로 구성해주세요."
                />
                <Input.Text
                    title="비밀번호 확인"
                    type="password"
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
        {loading&&<Loading/>}
        </>
    )
}