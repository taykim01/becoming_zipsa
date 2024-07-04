"use client"

import ReadCatUseCase from "@/domain/use_case/cat/read_cat_use_case"
import Badge from "@/lib/badge"
import Loading from "@/lib/loading"
import { useEffect, useState } from "react"

export default function BadgeGroup() {
    const read_cat_use_case = new ReadCatUseCase()

    const [catData, setCatData] = useState<CatModel>({} as CatModel)
    const [loading, setLoading] = useState<boolean>(false)
    const readCatData = async () => {
        setLoading(true)
        const response = await read_cat_use_case.read()
        if (!response.success) {
            alert(response.message)
            return
        }
        setCatData(response.data)
        setLoading(false)
    }
    useEffect(() => {
        readCatData()
    }, [])

    return (
        <>
            <div className="flex flex-col gap-3 w-full items-center">
                {
                    catData.badges?.length > 0
                    ? catData.badges?.map((badge, index) => {
                        return <Badge key={index} title={badge} />
                    })
                    : <div className="font-fs-l text-m18">{catData.catName}(이)는 아직 뱃지가 없어요.</div>
                }
            </div>
            {loading && <Loading />}
        </>
    )
}