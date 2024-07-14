"use client"

import Button from "@/lib/button";
import { useState } from "react";
import SettingsConatiner from "./settings_container";


export default function LogOutButton() {

    return (
        <>
            <SettingsConatiner title={"계정"} content={"mail@mail.com"} children={
                <div className="flex flex-col gap-3">
                    <Button.SmallDefault onClick={() => {}}>
                        로그아웃
                    </Button.SmallDefault>
                    <Button.SmallDefault  onClick={() => {}}>
                        삭제
                    </Button.SmallDefault>
                </div>
            }>
            </SettingsConatiner>



        </>
    )
}