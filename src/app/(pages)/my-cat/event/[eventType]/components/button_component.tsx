"use client"

import Button from "../../../../../../lib/button"
import React from "react"
import DeleteCat from "../../../../../../repository/v1.0.0/cat/delete_cat"
import { useLoadingRouter } from "@/hooks/use_loading_router"

export default function ButtonComponent(){
    const delete_cat = new DeleteCat()


    const router = useLoadingRouter()


    const deleteCat = async () => {
        const response = await delete_cat.delete()
        if (!response.success) {
            return
        }
        localStorage.clear()
        router('/adopt-cat')
    }

    return(
        <Button.Default onClick={deleteCat}>보내주기</Button.Default>
    )
}