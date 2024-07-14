"use client"

import React, { useEffect, useState } from "react";
import { Cat } from "../../../../../../repository/v1.0.0/cat/cat";
import ReadCat from "../../../../../../repository/v1.0.0/cat/read_cat";

export default function Text() {
    const read_cat = new ReadCat()
    const [catData, setCatData] = useState({} as Cat)


    const readCat = async () => {
        const response = await read_cat.read();
        if (!response.success) {
            alert(response.message);
            return;
        }
        setCatData(response.data);
    }

    useEffect(()=> {
        readCat();
    }, [])

    return (
        <div className="font-fs-l text-16 text-yellow-100 text-center">
            {catData.name}(이)는 고양이별로 돌아갔어요.<br/>
            {catData.name}(이)의 행복을 빌어주세요~
        </div>
    )
}