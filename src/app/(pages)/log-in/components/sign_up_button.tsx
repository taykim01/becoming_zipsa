"use client"

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
    )
}