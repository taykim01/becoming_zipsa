"use client"

import CheckSessionUseCase from "@/domain/use_case/auth/check_session_use_case"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function CheckSession(props:{
    successRoute?: string,
    routeMessage?: string
}) {
    console.log(props.successRoute)
    const check_session_use_case = new CheckSessionUseCase()
    const router = useRouter()
    const checkSession = async () => {
        const response = await check_session_use_case.check()
        if (!response.success) {
            alert(response.message)
            router.push("/log-in")
            return
        }
        if(props.successRoute) {
            alert(props.routeMessage)
            router.push(props.successRoute || "/")
        }
    }
    useEffect(()=>{
        checkSession()
    },[])
    return <></>
}