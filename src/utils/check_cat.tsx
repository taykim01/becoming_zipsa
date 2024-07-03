"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function CheckCat() {
    const check_cat_use_case = new CheckCatUseCase()

    const router = useRouter()
    const checkCat = async () => {
        const response = await check_cat_use_case.check()
        if (response.data === "yes_cat") {
            alert("이미 고양이가 있어요. 고양이 서운해")
            router.push("/my-cat")
            return
        }
    }
    useEffect(()=>{
        checkCat()
    },[])
    return <></>
}