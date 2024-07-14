"use client"

import Button from "../../../../../../lib/button"
import React from "react"
import { useRouter } from "next/navigation"

export default function ButtonComponent(){
    const router = useRouter()
    const toHome = () => router.push("/")

    return(
        <Button.Default onClick={toHome}>고양이 별로 보내주기</Button.Default>
    )
}