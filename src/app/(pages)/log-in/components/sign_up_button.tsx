"use client"

import { useRouter } from "next/navigation";

export default function SignUpButton() {
    const router = useRouter();
    return (
        <div
            className="font-fs-r text-gray-dark text-r16"
            onClick={() => router.push("/sign-up")}
        >
            회원가입하기
        </div>
    )
}