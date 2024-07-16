"use client"

import React from "react";
import Button from "../../../../lib/button";
import SettingsConatiner from "./settings_container";
import { useLoadingRouter } from "@/hooks/use_loading_router";

export default function MyBadge() {
    const router = useLoadingRouter()

    return (
        <SettingsConatiner title="뱃지" content={<Button.Text onClick={() => router("/my-cat/badge")}>더보기</Button.Text>} />
    )
}