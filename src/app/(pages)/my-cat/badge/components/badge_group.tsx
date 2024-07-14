"use client"

import Badge, { Badges } from "@/lib/badge"
import Loading from "@/lib/loading"
import Popup from "@/lib/popup"
import { loadingState } from "@/recoil/loading"
import { Cat } from "@/repository/v1.0.0/cat/cat"
import ReadCat from "@/repository/v1.0.0/cat/read_cat"
import { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"

export default function BadgeGroup() {
    const read_cat_use_case = new ReadCat()

    const [catData, setCatData] = useState({} as Cat)
    const [badges, setBadges] = useState([] as Badges[])
    const setLoading = useSetRecoilState(loadingState)
    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: ""
    })


    const readCatData = async () => {
        setLoading(true)
        const response = await read_cat_use_case.read()
        if (!response.success) {
            setErrorPopup({
                open: true,
                title: "오류가 발생했어요!",
                children: response.message
            })
            return
        }
        const data = response.data as Cat
        if (data.neutered) setBadges(prev => [...prev, "씩씩한 고양이"])
        if (data.medicated) setBadges(prev => [...prev, "건강한 고양이"])
        setCatData(response.data)
        setLoading(false)
    }


    useEffect(() => {
        readCatData()
    }, [])


    return (
        <>
            <div className="absolute overflow-scroll w-full h-full flex flex-col gap-3 items-center">
                <Badge title="씩씩한 고양이" opaque={!catData.neutered} />
                <Badge title="건강한 고양이" opaque={!catData.medicated} />
                <Badge title="깨끗한 고양이" opaque={true} />
            </div>
            <Popup.Default
                open={errorPopup.open}
                onClose={() => setErrorPopup({ ...errorPopup, open: false })}
                title={errorPopup.title}
            >
                {errorPopup.children}
            </Popup.Default>
        </>
    )
}