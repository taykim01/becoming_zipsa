"use client"

import Button from "@/lib/button";
import { loadingState } from "@/recoil/loading";
import NeuterCat from "@/repository/v1.0.0/cat/neuter_cat";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

export default function HospitalButton() {
    const neuter_cat = new NeuterCat()


    const router = useRouter()
    const setLoading = useSetRecoilState(loadingState)


    const neuter = async () => {
        setLoading(true)
        const response = await neuter_cat.neuter()
        if (!response.success) {
            alert(response.message)
            return
        }
        alert(response.message)
        router.push("/my-cat")
    }


    return (
        <Button.UserAction onClick={neuter} iconType="Injection" textColor="white">병원가기</Button.UserAction>
    )
}