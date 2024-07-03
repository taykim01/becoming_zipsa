"use client"

import CheckAuthSessionUseCase from "@/domain/use_case/auth/check_session_use_case"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function CheckSession() {
    const check_auth_session_use_case = new CheckAuthSessionUseCase()
    const router = useRouter()
    const checkSession = async () => {
        const response = await check_auth_session_use_case.check()
        if (!response.success) {
            alert(response.message)
            router.push("/log-in")
            return
        }
    }
    useEffect(()=>{
        checkSession()
    },[])
    return <></>
}