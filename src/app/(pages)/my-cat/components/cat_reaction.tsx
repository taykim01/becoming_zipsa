"use client"

import ReadCat from "../../../../repository/v1.0.0/cat/read_cat"
import CatResponse from "../../../../lib/cat_response"
import React, { useEffect, useState } from "react"
import { Cat } from "../../../../repository/v1.0.0/cat/cat"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { catResponseState } from "../../../../recoil/cat_response"
import { chatOrActionState } from "../../../../recoil/chat_or_action"
import { loadingState } from "@/recoil/loading"

export default function CatReaction() {
    const read_cat = new ReadCat()


    const [catData, setCatData] = useState({} as Cat)
    const chatOrAction = useRecoilValue(chatOrActionState)
    const catResponse = useRecoilValue(catResponseState)
    const setLoading = useSetRecoilState(loadingState)


    const readCat = async () => {
        try {
            setLoading(true)
            const response = await read_cat.read()
            if (!response.success) {
                return
            }
            setCatData(response.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        readCat()
    }, [catResponse])

    return (
        <>
            {chatOrAction === "action" && <CatResponse name={catData.name}>{catResponse}</CatResponse>}
        </>
    )
}