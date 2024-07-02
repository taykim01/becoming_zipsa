"use client"

import Button from "@/lib/button";
import { useRouter } from "next/navigation";

export default function ToLogInButton() {
    const router = useRouter();
    return (
        <Button.Default
            onClick={() => router.push("/log-in")}
        >시작</Button.Default>
    )
}