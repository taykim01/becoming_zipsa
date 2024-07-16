"use client"

import React, { useEffect, useState } from "react";
import { Cat } from "../../../../../repository/v1.0.0/cat/cat";
import Icons from "../../../../../lib/icons"
import ReadCat from "@/repository/v1.0.0/cat/read_cat";
import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup";

export default function Portrait() {
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


    const portraits: any = {
        "흰냥이": Icons.PortraitWhite,
        "깜냥이": Icons.PortraitBlack,
        "치즈냥이": Icons.PortraitCheese,
    }


    const Portrait = () => portraits[catData.color]
    const PortraitPaw = () => Icons.PortraitPaw

    const pawLocations = [
        { x: 110, y: -20, rotate: 180 },
        { x: -20, y: 60, rotate: 100 },
        { x: 120, y: 140, rotate: 75 },
    ]

    return (
        <div className="relative bg-sky border-beige-400 flex justify-center items-center overflow-hidden" style={{ borderWidth: 10, width: 193, minHeight: 193 }}>
            {
                pawLocations.map((paw, index) => {
                    return <div key={index} className="absolute" style={{ transform: `rotate(${paw.rotate} deg)`, left: paw.x, bottom: paw.y }}>
                        <PortraitPaw />
                    </div>
                })
            }
            <div className="flex justify-center items-center box-border" style={{ transform: "scale(0.6)", width: 150, height: 150 }}><Portrait /></div>
        </div>
    )
}