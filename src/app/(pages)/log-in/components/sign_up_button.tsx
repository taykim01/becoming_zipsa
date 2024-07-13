"use client"

import Button from "@/lib/button";
import Components from ".";
import { useState } from "react";

export default function SignUpButton() {
    const [popup, setPopup] = useState(false)
    
    return (
        <>
            <Button.Text onClick={() => setPopup(true)}>
                회원가입하기
            </Button.Text>
            <Components.SignUpPopup open={popup} onClose={() => setPopup(false)} />
        </>
    )
}