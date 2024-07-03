import Button from "@/lib/button";
import CatResponse from "@/lib/cat_response";
import Components from "./components"
import Container from "@/lib/container";
import Image from "next/image"
import Images from "@/lib/images";


export default function Page() {
    return (
        <Container.Main headerTitle="중성화" bgClass="bg-gradient-3" badge back>
            <div className="relative flex flex-col items-center flex-grow">
                <div className="pt-[120px] ">
                    <CatResponse>내가 고자라니 ㅠㅠ....</CatResponse>
                </div>
                <div className="pt-[90px]">
                    <Image src={Images.toy} width={253} height={253} alt="toy" />
                </div>
                <div className="absolute bottom-10 w-full">
                    <Components.HospitalButton/>
                </div>
            </div> 
        </Container.Main>
    )
}