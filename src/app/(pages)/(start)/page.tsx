import Container from "@/lib/container"
import Components from "./components"
import Image from "next/image"
import Images from "@/lib/images"

export default function Page() {
    return (
        <Container.Start>
            <div className="flex flex-col items-center gap-16">
                <div className="flex items-center justify-center w-full">
                    <div className="font-ohsquare text-black-1 text-45">집사가 되...</div>
                    <Image src={Images.heart} width={51} height={50.25} alt="heart" />
                </div>
                <Image src={Images.house} width={246} height={246} alt="house" />
            </div>
            <Components.ToLogInButton />
        </Container.Start>
    )
}