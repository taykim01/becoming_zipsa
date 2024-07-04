"use client"
import Image from "next/image";
import Images from "../images";

export default function Badge(props: {
    title: "깨끗한 고양이" | "건강한 고양이" | "씩씩한 고양이"
}) {
    const badgeColor = {
        "깨끗한 고양이": {
            color: "emerald-500",
            img: Images.paw,
            detail: "목욕 성공"
        },
        "건강한 고양이": {
            color: "pink-400",
            img: Images.kit,
            detail: "질병 극복"
        },
        "씩씩한 고양이": {
            color: "pink-100",
            img: Images.toy,
            detail: "중성화 완료"
        }
    }

    return (
        <div className="flex py-2 pr-7 pl-2 items-center justify-between gap-[124px] h-fit rounded-full bg-white-40">
            <div className="flex w-24 h-24 justify-center items-center rounded-full overflow-hidden bg-white-80">
                <Image alt={props.title} src={badgeColor[props.title].img || ""} width={60} height={60} />
            </div>
            <div className="inline-flex flex-col justify-items-center">
                <div className={`text-sb20 text-${badgeColor[props.title].color} font-fs-sb`}>{props.title}</div>
                <div className="text-r14 text-black font-fs-r text-right">{badgeColor[props.title].detail}</div>
            </div>
        </div>
    );
}
