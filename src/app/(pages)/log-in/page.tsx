import Container from "@/lib/container";
import Components from "./components";
import Image from "next/image";
import Images from "@/lib/images";
import CheckSessionTag from "@/utils/check_session_tag";

export default function Page() {
    return (
        <>
            <Container.Start>
                <div className="relative flex flex-col w-full gap-20 items-center h-full">
                    <div className="flex items-center justify-center w-full h-full">
                        <div className="font-ohsquare text-black-1 text-35">집사가 되...</div>
                        <Image src={Images.heart} width={51} height={50.25} alt="heart" />
                    </div>
                    <Components.InputLogIn />
                </div>
            </Container.Start>

            <CheckSessionTag />
        </>
    )
}