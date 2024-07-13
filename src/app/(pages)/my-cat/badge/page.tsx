import Container from "@/lib/container";
import InfoComponents from "../components";
import Components from "./components";
import CatAnimation from "../components/cat_animation";

export default function Page() {
    return (
        <Container.Main headerTitle="뱃지" back>
            <div className="flex flex-col gap-7 items-center relative w-full h-full">
                <div style={{ height: 150 }}>
                    <CatAnimation />
                </div>
                <InfoComponents.CatInfo />
                <div className="relative w-full h-full">
                    <Components.BadgeGroup />
                </div>
            </div>
        </Container.Main>
    )
}
