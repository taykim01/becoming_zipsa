"use client"

import { ChangeEvent } from "react";
import InputFrame from "./input_frame";


export default function Text(props: {
    title?: string,
    guide?: string,
    onChange?: (value: string) => void
}) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        props.onChange && props.onChange(value);
    }
    return (
        <InputFrame
            title={props.title}
            guide={props.guide}
        >
            <input
                type="text"
                className="p-5 border border-white-72 bg-white-15 rounded-2xl w-full font-fs-l text-white text-l20"
                onChange={handleChange}
            />
        </InputFrame>
    )
}