"use client"

import React from "react";
import Button from "../../../../lib/button";
import { useState } from "react";
import SettingsConatiner from "./settings_container";
import { useRouter } from "next/navigation";

export default function MyBadge() {
    const [popup, setPopup] = useState(false)
    const router = useRouter()

    return (
        <>
            <SettingsConatiner title="뱃지" content={<Button.Text onClick={() => router.push("/my-cat/badge")}>더보기</Button.Text>}>
            </SettingsConatiner>
        </>
    )
}