"use client"

import Container from "@/lib/container";
import Image from "next/image";
import Images from "@/lib/images";
import Components from "./components";
import { useParams } from "next/navigation";
import CatResponse from "@/lib/cat_response";


export default function Page() {
    const params = useParams()
    const eventType = params.eventType as "disease" | "neutering";


    const eventTranslation = {
        "disease": "질병",
        "neutering": "중성화",
    };

    const image = {
        "disease": Images.tablet,
        "neutering": Images.kit,
    };

    const buttonType = {
        "disease": Components.PillButton,
        "neutering": Components.HospitalButton,
    };

    const response = {
        "disease": "집사야 아프다ㅠㅠ",
        "neutering": "내가 고자라니...?",
    }

    const color = {
        "disease": "bg-type5",
        "neutering": "bg-type4"
    }


    const ButtonComponent = buttonType[eventType];

    return (
        <Container.Main headerTitle={eventTranslation[eventType]} bgClass={color[eventType]}>
            <div className="justify-between flex flex-col items-center flex-grow">
                <div className="pt-[120px] ">
                    <CatResponse>{response[eventType]}</CatResponse>
                </div>
                <Image src={image[eventType]} width={150} height={150} alt={eventType} />
                <ButtonComponent />
            </div>
        </Container.Main>
    );
}