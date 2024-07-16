"use client"

import { useLoadingRouter } from "@/hooks/use_loading_router"
import { loadingState } from "@/recoil/loading"
import ReadCat from "@/repository/v1.0.0/cat/read_cat"
import CheckSession from "@/repository/v1.0.0/user/check_session"
import { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"


export default function CheckSessionTag(props: {
    noSession?: string,
    session?: string,
    googleException?: boolean
}) {
    const check_session = new CheckSession()
    const read_cat = new ReadCat()


    const router = useLoadingRouter()
    const setLoading = useSetRecoilState(loadingState)
    const readCatData = () => read_cat.read()
    const [isCat, setIsCat] = useState(false)

    
    const checkSession = async () => {
        setLoading(true)
        const response = await check_session.check()
        if (!response.success && props.noSession) router(props.noSession)
        if (response.success && props.session) {
            if (props.googleException) {
                if (isCat) router(props.session)
            } else router(props.session)
        }
        setLoading(false)
    }

    
    useEffect(() => {
        readCatData().then((response) => {
            setIsCat(response.success)
        }).finally(() => {
            checkSession()
        })
    }, [])
    return <></>
}