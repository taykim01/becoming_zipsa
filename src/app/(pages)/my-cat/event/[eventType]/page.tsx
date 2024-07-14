"use client"

import Container from "@/lib/container";
import Image from "next/image";
import Images from "@/lib/images";
import Components from "./components";
import { useParams } from "next/navigation";


export default function Page() {
    const params = useParams()
    const eventType = params.eventType as "disease" | "neuter";

    const eventTranslation = {
        "disease": "질병",
        "neuter": "중성화",
    };

    const image = {
        "disease": Images.tablet,
        "neuter": Images.toy,
    };

    const ButtonType = {
        "disease": Components.PillButton,
        "neuter": Components.HospitalButton,
    };

    const color = {
        "disease": "bg-type5",
        "neuter": "bg-type4"
    }


    const ButtonComponent = ButtonType[eventType];

    return (
        <Container.Main headerTitle={eventTranslation[eventType]} bgClass= {color[eventType]}>
            <div className="justify-between flex flex-col items-center flex-grow">
                <div className="pt-[120px] ">
                    {/* <CatResponse>목욕할 시간이라니 ....</CatResponse> */}
                </div>
                <div className="pt-0">
                    <Image src={image[eventType]} width={340} height={340} alt={eventType} />
                </div>
                <div className="w-full">
                    <ButtonComponent />
                </div>
            </div>
        </Container.Main>
    );
}