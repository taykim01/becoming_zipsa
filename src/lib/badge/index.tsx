"use client"

import Image from "next/image";
import Images from "../images";

export type Badges = "깨끗한 고양이" | "건강한 고양이" | "씩씩한 고양이"

export default function Badge(props: {
    title: Badges,
    opaque?: boolean
}) {
    const badgeColor = {
        "깨끗한 고양이": {
            color: "text-green-100",
            img: Images.paw,
            detail: "목욕 성공"
        },
        "건강한 고양이": {
            color: "text-pink-400",
            img: Images.kit,
            detail: "질병 극복"
        },
        "씩씩한 고양이": {
            color: "text-pink-300",
            img: Images.toy,
            detail: "중성화 완료"
        }
    }

    return (
        <div className={`flex py-2 pr-7 pl-2 items-center justify-between w-full h-fit rounded-3xl bg-white-0.4 ${props.opaque ? "opacity-20" : ""} `}>
            <div className="flex w-24 h-24 justify-center items-center overflow-hidden bg-white-0.8" style={{ borderRadius: 20 }}>
                <Image alt={props.title} src={badgeColor[props.title].img || ""} width={60} height={60} />
            </div>
            <div className="inline-flex flex-col justify-items-center">
                <div className={`text-20 ${badgeColor[props.title].color} font-fs-sb`}>{props.title}</div>
                <div className="text-14 text-black-1 font-fs-r text-right">{badgeColor[props.title].detail}</div>
            </div>
        </div>
    );
}
