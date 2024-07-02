import Button from "@/lib/button";
import CatResponse from "@/lib/cat_response";
import Components from "./components"
import Container from "@/lib/container";
import Image from "next/image"
import Images from "@/lib/images";


export default function Page() {
    return (
        <Container.Main headerTitle="중성화" >
            <div className="relative flex flex-col items-center">
                <div className="pt-[135px] ">
                    <CatResponse>내가 고자라니ㅠㅠ....</CatResponse>
                </div>
                <div className="pt-[96px]">
                    <Image src={Images.toy} width={253} height={253} alt="toy" />
                </div>
                <div className="flex gap-3 pt-[110px] pd-[85px] w-full">
                    <Components.HospitalButton/>
                </div>
            </div> 
        </Container.Main>
    )
}