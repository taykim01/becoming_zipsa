"use client"

import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup"
import Badge from "@/lib/badge"
import { loadingState } from "@/recoil/loading"
import { Cat } from "@/repository/v1.0.0/cat/cat"
import ReadCat from "@/repository/v1.0.0/cat/read_cat"
import { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"

export default function BadgeGroup() {
    const read_cat_use_case = new ReadCat()

    const [catData, setCatData] = useState({} as Cat)
    const setLoading = useSetRecoilState(loadingState)
    const raiseErrorPopup = useRaiseErrorPopup()


    const readCatData = async () => {
        setLoading(true)
        const response = await read_cat_use_case.read()
        if (!response.success) {
            raiseErrorPopup(response.message)
            return
        }
        setCatData(response.data)
        setLoading(false)
    }


    useEffect(() => {
        readCatData()
    }, [])


    return (
        <div className="absolute overflow-scroll w-full h-full flex flex-col gap-3 items-center">
            <Badge title="씩씩한 고양이" opaque={!catData.neutered} />
            <Badge title="건강한 고양이" opaque={!catData.medicated} />
            <Badge title="깨끗한 고양이" opaque={true} />
        </div>
    )
}