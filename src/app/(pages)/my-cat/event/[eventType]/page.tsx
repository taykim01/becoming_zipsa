"use client"

import Container from "@/lib/container";
import Image from "next/image";
import Images from "@/lib/images";
import Components from "./components";
import { useParams } from "next/navigation";
import CatResponse from "@/lib/cat_response";
import { Cat } from "@/repository/v1.0.0/cat/cat";
import ReadCat from "@/repository/v1.0.0/cat/read_cat";
import { useEffect, useState } from "react";


export default function Page() {
    const read_cat = new ReadCat()


    const params = useParams()
    const [catData, setCatData] = useState({} as Cat)
    const eventType = params.eventType as "disease" | "neutering" | "leave";


    const eventTranslation = {
        "disease": "질병",
        "neutering": "중성화",
        "leave": "이별",
    };

    const image = {
        "disease": Images.tablet,
        "neutering": Images.kit,
        "leave": Images.leave,
    };

    const buttonType = {
        "disease": Components.HospitalButton,
        "neutering": Components.PillButton,
        "leave": Components.ButtonComponent,
    };

    const response = {
        "disease": "집사야 아프다ㅠㅠ",
        "neutering": "내가 고자라니...?",
        "leave": "에휴 차라리 혼자 살련다...",
    }

    const color = {
        "disease": "bg-type5",
        "neutering": "bg-type4",
        "leave": "bg-beige-200",
    }

    const titleColor = {
        "disease": "white",
        "neutering": "black",
        "leave": "black",
    }

    const getCatData = async () => {
        const response = await read_cat.read()
        if (!response.success) {
            return
        }
        setCatData(response.data)
    }

    useEffect(() => {
        getCatData()
    }, [])


    const ButtonComponent = buttonType[eventType];

    return (
        <Container.Main headerTitle={eventTranslation[eventType]} bgClass={color[eventType]} titleColor={titleColor[eventType] as "white" | "black"}>
            <div className="pt-10"><CatResponse>{response[eventType]}</CatResponse></div>
            <Image src={image[eventType]} width={250} height={250} alt={eventType} />
            {
                eventType === "leave" &&
                <div className="text-14 text-gray-500 mt-3 text-center">{catData.name}가 떠났어요ㅠㅠ<br />
                    다음 고양이는 애정을 담아 키워주세요 ~</div>
            }
            <ButtonComponent />
        </Container.Main>
    );
}