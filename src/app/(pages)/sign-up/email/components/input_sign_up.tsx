"use client"

import Input from "@/lib/input";
import { useState } from "react";
import Button from "@/lib/button";
import Loading from "@/lib/loading";
import EmailSignUp from "@/repository/v1.0.0/user/email_sign_up";
import Popup from "@/lib/popup";
import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup";
import { useLoadingRouter } from "@/hooks/use_loading_router";

export default function InputSignUp() {
    const sign_up = new EmailSignUp()


    const router = useLoadingRouter()
    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
        passwordCheck: "",
        name: ""
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: ""
    })
    const [popup, setPopup] = useState(false)
    const raiseErrorPopup = useRaiseErrorPopup()


    const setEmail = (email: string) => setSignUpData({ ...signUpData, email })
    const setPassword = (password: string) => setSignUpData({ ...signUpData, password })
    const setPasswordCheck = (passwordCheck: string) => setSignUpData({ ...signUpData, passwordCheck })
    const setName = (name: string) => setSignUpData({ ...signUpData, name })


    const signUp = async () => {
        setLoading(true)
        const verifyRes = await sign_up.verifyInput(signUpData.email, signUpData.password, signUpData.passwordCheck, signUpData.name)
        if (!verifyRes.success) {
            raiseErrorPopup(verifyRes.message)
            setLoading(false)
            return
        }
        const signUpRes = await sign_up.signUp()
        if (signUpRes.data.includes("email-already-in-use")) {
            setErrorPopup({
                open: true,
                title: "이미 사용 중인 이메일이에요.",
                children: "다른 이메일을 사용해주세요."
            })
            setLoading(false)
            return
        } else if (!signUpRes.success) {
            raiseErrorPopup(signUpRes.message)
            setLoading(false)
            return
        }
        const createUserRes = await sign_up.createUser()
        if (!createUserRes.success) {
            await sign_up.deleteAuth()
            raiseErrorPopup(createUserRes.message)
            setLoading(false)
            return
        }
        setLoading(false)
        setErrorPopup({
            open: true,
            title: "회원가입이 완료되었어요.",
            children: "이제 고양이를 입양해보아요!."
        })
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
                        guide="비밀번호 규칙"
                        guideClick={() => setPopup(true)}
                        onChange={setPassword}
                        onEnter={signUp}
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
                <Button.Default onClick={signUp}>회원가입하기</Button.Default>
            </div>
            {loading && <Loading />}
            <Popup.Default
                open={errorPopup.open}
                onClose={() => {
                    setErrorPopup({ ...errorPopup, open: false });
                    errorPopup.title === "회원가입이 완료되었어요." && router("/adopt-cat");
                }}
                title={errorPopup.title}
            >
                {errorPopup.children}
            </Popup.Default>
            <Popup.Default
                open={popup}
                onClose={() => setPopup(false)}
                title="비밀번호 규칙"
            >
                비밀번호는 알파벳, 숫자, 특수문자를 포함한 8자 이상으로 설정해주세요.
            </Popup.Default>
        </>
    )
}