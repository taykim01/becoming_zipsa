"use client"

import Button from "@/lib/button";
import { useState } from "react";
import SettingsConatiner from "./settings_container";

export default function MyBadge() {
    const [popup, setPopup] = useState(false)
    
    return (
        <>
        <SettingsConatiner title={"뱃지"} content={<Button.Text onClick={()=>{}}>더보기</Button.Text>} children={<></>}>
        </SettingsConatiner>
        </>
    )
}