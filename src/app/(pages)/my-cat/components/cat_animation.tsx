"use client"

import "./components.css"
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { catFeelingState } from '@/recoil/cat_feeling';
import CatHearts from './cat_hearts';
import { useEffect, useState } from 'react';
import CatComponent from '@/lib/cat_component';
import ReadCat from '@/repository/v1.0.0/cat/read_cat';
import { Cat } from '@/repository/v1.0.0/cat/cat';
import Components from ".";
import Icons from "@/lib/icons";
import { chatOrActionState } from "@/recoil/chat_or_action";
import size from "@/lib/size";
import { loadingState } from "@/recoil/loading";
import { useLoadingRouter } from "@/hooks/use_loading_router";


export default function CatAnimation() {
    const read_cat = new ReadCat()


    const router = useLoadingRouter()
    const [catData, setCatData] = useState({} as Cat)
    const [catFeeling, setCatFeeling] = useRecoilState(catFeelingState)
    const chatOrAction = useRecoilValue<"chat" | "action">(chatOrActionState)
    const [expand, setExpand] = useState(false)
    const expandCat = () => setExpand(!expand)
    const setLoading = useSetRecoilState(loadingState)
    const [screenshotHeight, setScreenshotHeight] = useState(0)


    const readCatData = async () => {
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
        const screenshotArea = document.getElementById('screencaptureArea')
        const newScreenshotHeight = screenshotArea
            ? screenshotArea.clientHeight + 8
            : 200
        const heightDivisor = expand ? 1.8 : 4
        const heartStartHeight = newScreenshotHeight / heightDivisor
        setScreenshotHeight(heartStartHeight)
    }, [expand, chatOrAction])



    const heartLocations = [
        { x: 20, y: 20, size: 1.0 },
        { x: 260, y: 0, size: 1.3 },
        { x: 80, y: 100, size: 1.1 },
        { x: 190, y: 130, size: 0.7 },
    ]


    useEffect(() => {
        setTimeout(() => {
            setCatFeeling("negative")
        }, 2000);
    }, [catFeeling])


    useEffect(() => {
        readCatData()
    }, [])

    const ExpandIcon = () => Icons.Expand
    const ShrinkIcon = () => Icons.Shrink
    const MedalIcon = () => Icons.Medal
    const SettingsIcon = () => Icons.Settings


    return (
        <div
            style={{
                maxHeight: expand
                    ? "100vh"
                    : size.myCatVisual
            }}
            className="flex-grow relative relative w-full flex flex-col items-center rounded-3xl border-4 border-beige-300 gap-5 box-border"
            id="screencaptureArea"
        >
            <div className="absolute top-3 left-3 p-2" style={{ zIndex: 1000 }}>
                {
                    expand
                        ? <div onClick={expandCat}><ShrinkIcon /></div>
                        : <div onClick={expandCat}><ExpandIcon /></div>
                }
            </div>
            <div className="absolute top-5 right-5 flex flex-col gap-2" style={{ zIndex: 1000 }}>
                <div onClick={() => router("/my-cat/badge")}><MedalIcon /></div>
                <div onClick={() => router("/settings")}><SettingsIcon /></div>
            </div>
            <div className={`relative w-full h-full flex-grow ${expand ? "expand" : "default"}`}>
                {
                    heartLocations.map((location, i) => (
                        <div
                            key={i}
                            id={`heart${i}`}
                            className='absolute'
                            style={{
                                left: location.x,
                                bottom: location.y + screenshotHeight,
                                transform: `scale(${expand ? location.size * 1.2 : location.size})`
                            }}>
                            {catFeeling === "positive" && <CatHearts />}
                        </div>
                    ))
                }
                {
                    catData.color && <CatComponent color={catData.color} />
                }
            </div>
            <div className="absolute bottom-3 flex justify-center" style={{ maxWidth: `calc(100% - 40px)` }}>
                {
                    chatOrAction === "action"
                        ? <Components.CatReaction />
                        : <Components.CatInfo expand={true} />
                }
            </div>
        </div>
    );
}