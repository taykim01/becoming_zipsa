import Button from "@/lib/button";
import CatResponse from "@/lib/cat_response";
import Components from "./components"
import Container from "@/lib/container";
import Image from "next/image"
import Images from "@/lib/images";


export default function Page() {
    return (
        <Container.Main headerTitle="목욕" >
            <div className="relative flex flex-col items-center flex-grow">
                <div className="pt-[135px] ">
                    <CatResponse>목욕할 시간이라니 ....</CatResponse>
                </div>
                <div className="pt-0">
                    <Image src={Images.bath} width={340} height={340} alt="bath" />
                </div>
                <div className="absolute bottom-0 w-full">
                    <Components.BathButton/>
                </div>
            </div> 
        </Container.Main>
    )
}