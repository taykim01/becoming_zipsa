"use client"


import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup"
import "./components.css"
import { loadingState } from "@/recoil/loading"
import { Cat } from "@/repository/v1.0.0/cat/cat"
import ReadCat from "@/repository/v1.0.0/cat/read_cat"
import { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"
import SexSymbol from "@/lib/sex_symbol"


export default function CatInfo(props: { expand: boolean }) {
    const read_cat = new ReadCat()


    const setLoading = useSetRecoilState(loadingState)
    const [catData, setCatData] = useState({} as Cat)
    const raiseErrorPopup = useRaiseErrorPopup()


    const readCatData = async () => {
        try {
            setLoading(true);
            const response = await read_cat.read(true);
            if (!response.success) {
                raiseErrorPopup(response.message);
                setLoading(false);
                return;
            }
            setCatData(response.data);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        readCatData();
    }, [])



    return (
        <div className={`flex items-center ${props.expand ? "flex-row gap-2" : "flex-col gap-1"}`}>
            <div className="font-fs-sb text-20 text-pink-500">{catData.name}</div>
            <div className="flex gap-2 items-center font-fs-r text-14 text-gray-400">
                <div className="flex items-center">
                    <SexSymbol sex={catData.sex} />
                    <div>{catData.sex}</div>
                </div>
                <div>•</div>
                <div>{catData.chapter}</div>
            </div>
        </div>
    )
}