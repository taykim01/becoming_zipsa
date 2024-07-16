import Container from "@/lib/container";
import Components from "./components";
import CatInfo from "../components/cat_info";

export default function Page() {
    return (
        <Container.Main headerTitle="뱃지" back bgClass="bg-beige-200">
            <div className="flex flex-col gap-5 items-center relative w-full h-full">
                <Components.Portrait />
                <CatInfo expand />
                <div className="relative w-full h-full">
                    <Components.BadgeGroup />
                </div>
            </div>
        </Container.Main>
    )
}
