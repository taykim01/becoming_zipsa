"use client"

<<<<<<< HEAD
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
=======
import Components from ".";
import { useState } from "react";

export default function SignUpButton() {
    const [popup, setPopup] = useState(false)
    return (
        <>
        <div
            className="font-fs-r text-gray-dark text-r16"
            onClick={()=> setPopup(true)}
        >
            회원가입하기
        </div>
        <Components.SignUpPopup open={popup} onClose={() => setPopup(false)} />
        </>
>>>>>>> 65d9cea4ef3a1eb003596bf3d876b56153504e0c
    )
}