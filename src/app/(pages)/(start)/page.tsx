import Container from "@/lib/container"
import Components from "./components"
import Image from "next/image"
import Images from "@/lib/images"

export default function Page() {
    return (
        <Container.Start>
            <div className="relative flex flex-col gap-20 items-center pt-24 h-full">
                <div className="flex items-center justify-center w-full">
                    <div className="font-ohsquare text-black text-r45">집사가 되...</div>
                    <Image src={Images.heart} width={51} height={50.25} alt="heart" />
                </div>
                <Image src={Images.house} width={246} height={246} alt="house" />
                <div className="absolute bottom-5 w-full">
                    <Components.ToLogInButton />
                </div>
            </div>
        </Container.Start>
    )
}