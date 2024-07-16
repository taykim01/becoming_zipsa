"use client"

import Button from "@/lib/button";
import { loadingState } from "@/recoil/loading";
import ReadCat from "@/repository/v1.0.0/cat/read_cat";
import CheckSession from "@/repository/v1.0.0/user/check_session";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

export default function ToLogInButton() {
    const read_cat = new ReadCat()
    const check_sesssion = new CheckSession()


    const setLoading = useSetRecoilState(loadingState)
    const router = useRouter();

    const routeTo = async () => {
        setLoading(true)
        localStorage.clear()
        
        const response = await check_sesssion.check()
        if (!response.success) {
            router.push("/log-in")
            setLoading(false)
            return
        }

        const catResponse = await read_cat.read()
        if (catResponse.data === "no_cat") {
            router.push("/adopt-cat")
            setLoading(false)
            return
        }
        router.push("/my-cat")
        setLoading(false)
    }

    return (
        <Button.Default
            onClick={routeTo}
        >
            시작
        </Button.Default>
    )
}