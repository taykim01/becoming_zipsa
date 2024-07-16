"use client"


import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup";
import Gauge from "@/lib/gauge";
import { loadingState } from "@/recoil/loading";
import { Cat } from "@/repository/v1.0.0/cat/cat";
import ReadCat from "@/repository/v1.0.0/cat/read_cat";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";


export default function GaugeGroup() {
    const read_cat = new ReadCat()


    const [catData, setCatData] = useState({} as Cat)
    const setLoading = useSetRecoilState(loadingState)
    const raiseErrorPopup = useRaiseErrorPopup()


    const readCatData = async () => {
        try {
            setLoading(true)
            const response = await read_cat.read(true)
            if (!response.success) {
                raiseErrorPopup(response.message)
                return
            }
            setCatData(response.data)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        readCatData()
    }, [])

    return (
        <div className="flex flex-col gap-4 w-full items-center">
            <Gauge title="애정도" value={catData?.affection} />
            <Gauge title="포만감" value={catData?.hunger} />
            <Gauge title="체력" value={catData?.health} />
        </div>
    )
}