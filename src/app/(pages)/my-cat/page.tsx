import Container from "@/lib/container";
import Components from "./components";
import CheckSessionTag from "@/utils/check_session_tag";

export default async function Page() {
    return (
        <>
            <Container.Main headerTitle="내 고양이" bgClass="bg-beige-100">
                <div className="flex flex-col items-center justify-between relative w-full h-full gap-5 box-border">
                    <Components.CatAnimation />
                    <Components.InteractionGroup />
                </div>
            </Container.Main>
            <CheckSessionTag />
            <Components.UpdateTime />
        </>
    )
}