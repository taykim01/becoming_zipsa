import Container from "@/lib/container";
import Image from "next/image";
import InfoComponents from "../components";
import Components from "./components";

export default function Page() {
    return (
        <Container.Main headerTitle="뱃지" back>
            <div className="flex flex-col gap-7 items-center relative w-full h-full">
                <div className="pt-8 w-[135px] h-[135px] rounded-full border-pink-main border-[10px] overflow-hidden object-cover">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/stardenburdenhardenbart-kairos.appspot.com/o/website_images%2Fsample_pet.png?alt=media&token=0dc2e7c4-d7f0-4365-b0e9-f0deedc88735"
                        alt="내 고양이"
                        width={195}
                        height={195}
                    />
                </div>
                <div className="flex flex-col gap-10 w-full">
                    <InfoComponents.CatInfo></InfoComponents.CatInfo>
                    <Components.BadgeGroup />
                </div>

            </div>
        </Container.Main>
    )
}
