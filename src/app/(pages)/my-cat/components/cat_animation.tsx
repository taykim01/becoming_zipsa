"use client"

import "./components.css"
import { useRecoilState, useRecoilValue } from 'recoil';
import { catFeelingState } from '@/recoil/cat_feeling';
import CatHearts from './cat_hearts';
import { useEffect, useState } from 'react';
import CatComponent from '@/lib/cat_component';
import ReadCat from '@/repository/v1.0.0/cat/read_cat';
import { Cat } from '@/repository/v1.0.0/cat/cat';
import Components from ".";
import Icons from "@/lib/icons";
import { useRouter } from "next/navigation";
import { chatOrActionState } from "@/recoil/chat_or_action";
import size from "@/lib/size";


export default function CatAnimation() {
    const read_cat = new ReadCat()


    const router = useRouter()
    const [catData, setCatData] = useState({} as Cat)
    const [catFeeling, setCatFeeling] = useRecoilState(catFeelingState)
    const chatOrAction = useRecoilValue<"chat" | "action">(chatOrActionState)
    const [expand, setExpand] = useState(false)
    const expandCat = () => setExpand(!expand)


    const readCatData = async () => {
        const response = await read_cat.read()
        if (!response.success) {
            return
        }
        setCatData(response.data)
    }


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
                maxHeight: chatOrAction === "chat"
                ? expand
                    ? "100vh"
                    : size.myCatVisual
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
                <div onClick={() => router.push("/my-cat/badge")}><MedalIcon /></div>
                <div onClick={() => router.push("/settings")}><SettingsIcon /></div>
            </div>
            <div className={`relative w-full h-full flex-grow ${expand ? "expand" : "default"}`}>

                {
                    heartLocations.map((location, i) => (
                        <div
                            key={i}
                            className='absolute'
                            style={{
                                left: location.x,
                                bottom: expand ? `calc(${location.y}px + 20vh)` : location.y,
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