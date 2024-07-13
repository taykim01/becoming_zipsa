"use client"

import { useRecoilValue } from "recoil"
import "./loading.css"
import { loadingState } from "@/recoil/loading"
export default function Loading() {
    const loading = useRecoilValue(loadingState)
    return (
        <>
            {
                loading && <div className="loading_bg">
                    <div className="wrapper">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="shadow"></div>
                        <div className="shadow"></div>
                        <div className="shadow"></div>
                    </div>
                </div>
            }
        </>
    )
}