"use client"

import { useState } from "react";
import InputFrame from "./input_frame";

export default function MultiSelect(props: {
    title?: string,
    guide?: string,
    guideClick?: () => void,
    onSelect?: (value: string) => void,
    items: string[]
}) {
    const [selected, setSelected] = useState<string>("")
    const handleSelect = (item: (typeof props.items)[number]) => {
        if (selected === item) setSelected("");
        else setSelected(item);
        props.onSelect && props.onSelect(item);
    }
    return (
        <InputFrame
            title={props.title}
            guide={props.guide}
            guideClick={props.guideClick}
        >
            <div className="flex gap-2">
                {props.items.map((item, i) => (
                    <div
                        key={i}
                        className={`
                                px-5 py-3 flex-grow text-center border rounded-2xl w-full focus:outline-none
                                ${selected === item ? "border-pink-0.6 bg-pink-0.15 text-pink-300 font-fs-sb text-20" : " border-white-72 bg-white-0.15 text-gray-800 font-fs-l text-20"}
                            `}
                        onClick={() => handleSelect(item)}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </InputFrame>
    )
}