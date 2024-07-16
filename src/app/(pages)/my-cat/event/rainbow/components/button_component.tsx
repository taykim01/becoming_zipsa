"use client"

import Button from "../../../../../../lib/button"
import React from "react"
import { useLoadingRouter } from "@/hooks/use_loading_router"

export default function ButtonComponent(){
    const router = useLoadingRouter()
    const toHome = () => router("/")

    return(
        <Button.Default onClick={toHome}>고양이 별로 보내주기</Button.Default>
    )
}