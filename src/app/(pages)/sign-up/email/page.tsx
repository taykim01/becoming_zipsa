import Container from "@/lib/container";
import Components from "./components";

export default function Page() {
    return (
        <Container.Main back headerTitle="회원가입하기">
            <div className="flex-grow">
                <Components.InputSignUp />
            </div>
        </Container.Main>
    )
}