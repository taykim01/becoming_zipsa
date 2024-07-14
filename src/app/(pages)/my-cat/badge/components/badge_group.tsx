"use client"

import Badge from "@/lib/badge"
import Loading from "@/lib/loading"
import { loadingState } from "@/recoil/loading"
import { Cat } from "@/repository/v1.0.0/cat/cat"
import ReadCat from "@/repository/v1.0.0/cat/read_cat"
import { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"

export default function BadgeGroup() {
    const read_cat_use_case = new ReadCat()

    const [catData, setCatData] = useState({} as Cat)
    const [badges, setBadges] = useState([] as string[])
    const setLoading = useSetRecoilState(loadingState)


    const readCatData = async () => {
        setLoading(true)
        const response = await read_cat_use_case.read()
        if (!response.success) {
            alert(response.message)
            return
        }
        const data = response.data as Cat
        if(data.neutered) setBadges(prev => [...prev, "씩씩한 고양이"])
        setCatData(response.data)
        setLoading(false)
    }


    useEffect(() => {
        readCatData()
    }, [])


    return (
        <div className="absolute overflow-scroll w-full h-full flex flex-col gap-3 items-center">
            {
                badges?.length > 0
                    ? badges?.map((badge, index) => {
                        return <Badge key={index} title={badge} />
                    })
                    : <div className="font-fs-l text-18">{catData.name}(이)는 아직 뱃지가 없어요.</div>
            }
        </div>
    )
}