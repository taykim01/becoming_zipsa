"use client"

import Input from "@/lib/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/lib/button";
import GoogleSignUp from "@/repository/v1.0.0/user/google_sign_up";

export default function InputSignUp() {

    const sign_up = new GoogleSignUp()
    const router = useRouter()
    const [name, setName] = useState("")

    const signUp = async () => {
        const verifyRes = await sign_up.verifyInput(name)
        if (!verifyRes.success) {
            alert(verifyRes.message)
            return
        }
        const createUserRes = await sign_up.createUser(name)
        if (!createUserRes.success) {
            alert(createUserRes.message)
            return
        }
        alert("회원가입에 성공했습니다.")
        router.push("/adopt-cat")
    }

    return (
        <div className="relative flex flex-col items-center w-full h-full">
            <div className="flex flex-col gap-5 w-full items-center h-full">
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