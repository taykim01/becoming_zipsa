import Container from "@/lib/container";
import Components from "./components";
import CheckSessionTag from "@/utils/check_session_tag";

export default async function Page() {
    return (
        <Container.Main headerTitle="내 고양이" badge>
            <div className="flex flex-col items-center justify-between relative w-full h-full gap-5">
                <div className="flex flex-col items-center w-full gap-5 relative">
                    <Components.CatAnimation />
                    <Components.CatInfo />
                </div>

                <Components.InteractionGroup />
            </div>
            <CheckSessionTag />
        </Container.Main>
    )
}