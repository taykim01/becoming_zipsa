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
        "disease": Components.HospitalButton,
        "neutering": Components.PillButton,
    };

    const response = {
        "disease": "집사야 아프다ㅠㅠ",
        "neutering": "내가 고자라니...?",
    }

    const color = {
        "disease": "bg-type5",
        "neutering": "bg-type4"
    }

    const titleColor = {
        "disease": "white",
        "neutering": "black"
    }


    const ButtonComponent = buttonType[eventType];

    return (
        <Container.Main headerTitle={eventTranslation[eventType]} bgClass={color[eventType]} titleColor={titleColor[eventType] as "white" | "black"}>
            <div className="flex flex-col items-center gap-12 pb-10">
                <CatResponse>{response[eventType]}</CatResponse>
                <Image src={image[eventType]} width={250} height={250} alt={eventType} />
            </div>
            <ButtonComponent />
        </Container.Main>
    );
}