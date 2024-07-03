import Button from "@/lib/button";
import CatResponse from "@/lib/cat_response";
import Components from "./components"
import Container from "@/lib/container";
import Image from "next/image"
import Images from "@/lib/images";


export default function Page() {
    return (
        <Container.Main headerTitle="질병" bgClass="bg-gradient-0" badge back>
            <div className="relative flex flex-col items-center flex-grow">
                <div className="pt-[120px] ">
                    <CatResponse>랑이가 아파요ㅠㅠ</CatResponse>
                </div>
                <div className="pt-[28px]">
                    <Image src={Images.medicine} width={340} height={340} alt="medicine" />
                </div>
                <div className="absolute bottom-10 w-full">
                    <Components.PillButton/>
                </div>
            </div> 
        </Container.Main>
    )
}