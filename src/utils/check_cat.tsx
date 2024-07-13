"use client"

import ReadCat from "@/repository/v1.0.0/cat/read_cat"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function CheckCat(props: {
    for: "yes_cat" | "no_cat",
    response: "route" | "alert" | "both",
    content: string
}) {
    const read_cat = new ReadCat()

    const router = useRouter()
    const checkCat = async () => {
        const response = await read_cat.read()
        if (response.data === props.for) {
            if (props.response === "route") router.push(props.content)
            else if (props.response === "alert") alert(props.content)
            else {
                alert(props.content)
                router.push(props.content)
            }
            return
        }
    }
    useEffect(() => {
        checkCat()
    }, [])
    return <></>
}