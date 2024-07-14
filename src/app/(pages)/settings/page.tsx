import React from "react";
import Container from "../../../lib/container";
import CatInfo from "./components/cat_info";
import MyBadge from "./components/my_badge";
import LogOutButton from "./components/log_out_button";


export default function Page() {
    return (
        <Container.Main headerTitle="설정" back bgClass="bg-beige-100">
            <div className="flex flex-col gap-3 pt-5 box-border w-full">
                <CatInfo />
                <MyBadge />
                <LogOutButton />
            </div>
        </Container.Main>
    )
}
