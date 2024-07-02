"use client"

import InputFrame from "./input_frame";


export default function MultiSelect(props: {
    title?: string,
    guide?: string,
    onSelect?: (value: string) => void,
    items: string[]
}) {
    const handleSelect = (item: (typeof props.items)[number]) => {
        props.onSelect && props.onSelect(item);
    }
    return (
        <InputFrame
            title={props.title}
            guide={props.guide}
        >
            <div className="flex gap-2">
                {props.items.map((item, i) => (
                    <div
                        key={i}
                        className="p-5 flex-grow text-center border border-white-72 bg-white-15 rounded-2xl w-full font-fs-l text-white text-l20 focus:outline-none"
                        onClick={() => handleSelect(item)}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </InputFrame>
    )
}