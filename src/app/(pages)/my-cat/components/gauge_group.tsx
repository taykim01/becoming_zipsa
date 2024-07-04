"use client"

import ReadCatUseCase from "@/domain/use_case/cat/read_cat_use_case";
import Gauge from "@/lib/gauge";
import Loading from "@/lib/loading";
import { useState, useEffect } from "react";

export default function GaugeGroup(props: {}) {
    const read_cat_use_case = new ReadCatUseCase()
    
    const [catData, setCatData] = useState<CatModel>({} as CatModel)
    const [loading, setLoading] = useState<boolean>(false)
    const readCatData = async()=>{
        setLoading(true)
        const response = await read_cat_use_case.read()
        if (!response.success) {
            alert(response.message)
            return
        }
        setCatData(response.data)
        setLoading(false)
    }
    useEffect(()=>{
        readCatData()
    },[])

    return (
        <>
        <div className="flex flex-col gap-4 w-full">
            <Gauge title="애정도" value={catData?.catStatus?.affection} />
            <Gauge title="배고픔" value={catData?.catStatus?.hunger} />
            <Gauge title="체력" value={catData?.catStatus?.health} />
        </div>
        {loading&&<Loading/>}
        </>
        
    )
}