import Container from "@/lib/container";
import Components from "./components";
import CheckSessionTag from "@/utils/check_session_tag";

export default function Page() {
    return (
        <>
            <Container.Main back headerTitle="회원가입하기">
                <div className="flex-grow w-full">
                    <Components.InputSignUp />
                </div>
            </Container.Main>
            <CheckSessionTag session="/my-cat" />
        </>
    )
}