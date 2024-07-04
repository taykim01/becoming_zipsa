import Container from "@/lib/container";
import Image from "next/image";
import InfoComponents from "../components";
import Components from "./components";



export default function Badge() {
    return (
        <Container.Main headerTitle="뱃지" back>
            <div className="flex flex-col items-center relative w-full h-full">
                <div className="pt-[30px] w-[135px] h-[135px] rounded-full border-pink-main border-[10px] overflow-hidden object-cover">
                    <Image
                            src="https://firebasestorage.googleapis.com/v0/b/stardenburdenhardenbart-kairos.appspot.com/o/website_images%2Fsample_pet.png?alt=media&token=0dc2e7c4-d7f0-4365-b0e9-f0deedc88735"
                            alt="내 고양이"
                            width={195}
                            height={195}
                        />
                </div>
                <div className="pt-[28px]">
                    <InfoComponents.CatInfo></InfoComponents.CatInfo>
                </div>
                <div className="flex flex-col gap-3 pt-[40px]">
                    <Components.MyCatBadge badgeTitle="깨끗한 고양이"></Components.MyCatBadge>
                    <Components.MyCatBadge badgeTitle="건강한 고양이"></Components.MyCatBadge>
                    <Components.MyCatBadge badgeTitle="씩씩한 고양이"></Components.MyCatBadge>
                </div>
                
            </div>
        </Container.Main>
    )
}
