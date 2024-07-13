import Container from "@/lib/container";
import Components from "./components";
import CheckCat from "@/utils/check_cat";

export default function Page() {
    return (
        <>
            <Container.Main headerTitle="고양이 입양하기">
                <Components.InputCatData />
            </Container.Main>
            <CheckCat />
        </>
    )
}