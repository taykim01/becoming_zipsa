import Container from "@/lib/container";
import Image from "next/image";
import Images from "@/lib/images";
import Components from "./components";
import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    const eventType = router.query.eventType as "disease" | "neuter";

    const eventTranslation = {
        "disease": "질병",
        "neuter": "중성화",
    };

    const image = {
        "disease": Images.tablet,
        "neuter": Images.kit,
    };

    const ButtonType = {
        "disease": Components.PillButton,
        "neuter": Components.HospitalButton,
    };
    const ButtonComponent = ButtonType[eventType];

    return (
        <Container.Main headerTitle={eventTranslation[eventType]} bgClass="bg-gradient-2">
            <div className="relative flex flex-col items-center flex-grow">
                <div className="pt-[120px] ">
                    {/* <CatResponse>목욕할 시간이라니 ....</CatResponse> */}
                </div>
                <div className="pt-0">
                    <Image src={image[eventType]} width={340} height={340} alt={eventType} />
                </div>
                <div className="absolute bottom-10 w-full">
                    <ButtonComponent />
                </div>
            </div>
        </Container.Main>
    );
}