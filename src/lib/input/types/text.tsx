"use client"

import { ChangeEvent, KeyboardEvent } from "react";
import InputFrame from "./input_frame";


export default function Text(props: {
    title?: string,
    guide?: string,
    guideClick?: () => any,
    onChange?: (value: string) => void,
    type?: "text" | "password" | "email",
    onEnter?: () => any,
    placeholder?: string,
    info?: string
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
            info={props.info}
            guideClick={props.guideClick}
        >
            <input
                type={props.type || "text"}
                className="px-5 py-3 border border-white-0.72 bg-white-0.15 rounded-2xl w-full font-fs-l text-white-0.6 text-20 focus:outline-none placeholder-white-0.6"
                onChange={handleChange}
                onKeyDown={handleEnter}
                maxLength={100}
                placeholder={props.placeholder || ""}
            />
        </InputFrame>
    )
}