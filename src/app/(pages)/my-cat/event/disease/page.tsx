import Button from "@/lib/button";
import CatResponse from "@/lib/cat_response";
import Components from "./components"
import Container from "@/lib/container";
import Image from "next/image"
import Images from "@/lib/images";


export default function Page() {
    return (
        <Container.Main headerTitle="질병" >
            <div className="relative flex flex-col items-center">
                <div className="pt-[135px] ">
                    <CatResponse>랑이가 아파요ㅠㅠ</CatResponse>
                </div>
                <div className="pt-[28px]">
                    <Image src={Images.medicine} width={340} height={340} alt="medicine" />
                </div>
                <div className="flex gap-3 pt-[110px] pd-[85px] w-full">
                    <Components.PillButton/>
                </div>
            </div> 
        </Container.Main>
    )
}