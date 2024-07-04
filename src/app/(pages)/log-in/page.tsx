import Container from "@/lib/container";
import Components from "./components";
import Image from "next/image";
import Images from "@/lib/images";
import CheckSession from "@/utils/check_session";

export default function Page() {
    return (
        <Container.Start>
            <div className="relative flex flex-col gap-20 items-center pt-24 h-full">
                <div className="flex items-center justify-center w-full">
                    <div className="font-ohsquare text-white text-r45">집사가 되...</div>
                    <Image src={Images.heart} width={51} height={50.25} alt="heart" />
                </div>
                <Components.InputLogIn />
            </div>
            <CheckSession successRoute="/my-cat" routeMessage="이미 로그인 세션이 있습니다." />
        </Container.Start>
    )
}