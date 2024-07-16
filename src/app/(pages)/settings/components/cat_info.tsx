"use client"

import React, { useEffect, useState } from "react";
import InfoDetails from "./info_details";
import SettingsConatiner from "./settings_container";
import ReadCat from "../../../../repository/v1.0.0/cat/read_cat";
import { Cat } from "../../../../repository/v1.0.0/cat/cat";
import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup";


export default function CatInfo() {
    const read_cat = new ReadCat()


    const [catData, setCatData] = useState({} as Cat)
    const raiseErrorPopup = useRaiseErrorPopup()


    const readCatData = async () => {
        const response = await read_cat.read()
        if (!response.success) {
            raiseErrorPopup(response.message)
            return
        }
        setCatData(response.data)
    }

    useEffect(() => {
        readCatData()
    }, [])

    return (
        <SettingsConatiner title={"내 고양이"} content={<div className="font-fs-sb text-5 text-pink-500">{catData.name}</div>}>
            <div className="flex flex-col justify-between gap-2">
                <InfoDetails title="종류" content={catData.color}></InfoDetails>
                <InfoDetails title="성별" content={catData.sex}></InfoDetails>
                <InfoDetails title="시기" content={catData.chapter}></InfoDetails>
            </div>
        </SettingsConatiner>
    )
}