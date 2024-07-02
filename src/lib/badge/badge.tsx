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
        <div className="inline-flex py-[7px] pr-[29px] pl-[9px] items-center gap-[124px] rounded-full bg-white-40">
            <div className="flex w-[90px] h-[90px] py-[5px] px-[9px] justify-center items-center rounded-full bg-white-80">
                <Image alt={props.title} src={badgeColor[props.title].img} width={50} height={50} />
            </div>
            <div className="inline-flex flex-col justify-items-center">
                <div className={`text-sb20 text-${badgeColor[props.title].color} font-fs-sb`}>{props.title}</div>
                <div className="text-r14 text-black font-fs-r text-right">{badgeColor[props.title].detail}</div>
            </div>
        </div>
    );
}
