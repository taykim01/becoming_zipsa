"use client"

import CheckSessionUseCase from "@/domain/use_case/auth/check_session_use_case";
import Button from "@/lib/button";
import Loading from "@/lib/loading";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ToLogInButton() {
    const check_session_use_case = new CheckSessionUseCase()
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const routeTo = async () => {
        setLoading(true)
        const response = await check_session_use_case.check()
        if (response.success) {
            router.push("/my-cat")
            return
        } else {
            router.push("/log-in")
            return
        }
    }
    
    return (
        <>
            <Button.Default
                onClick={routeTo}
            >
                시작
            </Button.Default>
            {loading && <Loading />}
        </>
    )
}