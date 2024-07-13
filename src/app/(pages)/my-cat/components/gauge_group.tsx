"use client"


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


    const readCatData = async () => {
        setLoading(true)
        const response = await read_cat.read()
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
            <div className="flex flex-col gap-4 w-full">
                <Gauge title="애정도" value={catData?.affection} />
                <Gauge title="배고픔" value={catData?.hunger} />
                <Gauge title="체력" value={catData?.health} />
            </div>
        </>
    )
}