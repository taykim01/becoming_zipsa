import Container from "@/lib/container";
import Image from "next/image";
import Components from "./components";
import CheckCat from "@/utils/check_cat";

export default function Page() {
    return (
        <>
            <Container.Main headerTitle="고양이 입양하기">
                <div className="flex flex-col items-center relative w-full h-full gap-11">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/stardenburdenhardenbart-kairos.appspot.com/o/website_images%2Fsample_pet.png?alt=media&token=0dc2e7c4-d7f0-4365-b0e9-f0deedc88735"
                        alt="고양이 입양하기"
                        width={195}
                        height={195}
                    />
                    <Components.InputCatData />
                </div>
            </Container.Main>
            <CheckCat />
        </>
    )
}