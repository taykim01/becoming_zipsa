"use client"

import { ChangeEvent, KeyboardEvent } from "react";
import InputFrame from "./input_frame";


export default function Text(props: {
    title?: string,
    guide?: string,
    onChange?: (value: string) => void,
    type?: "text" | "password" | "email",
    onEnter?: () => any,
    placeholder?: string
}) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        props.onChange && props.onChange(value);
    }
    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.onEnter && props.onEnter();
        }
    }
    return (
        <InputFrame
            title={props.title}
            guide={props.guide}
        >
            <input
                type={props.type || "text"}
                className="p-5 border border-white-72 bg-white-15 rounded-2xl w-full font-fs-l text-white text-l20 focus:outline-none placeholder-white-60"
                onChange={handleChange}
                onKeyDown={handleEnter}
                placeholder={props.placeholder || ""}
            />
        </InputFrame>
    )
}