import React from "react";

export default function StatusBox(props:{
    name: string,
    value: number,
}){
    return(
        <div className="rounded-xl py-2 px-3 flex items-center justify-center gap-2 bg-beige-200 flex-grow">
            <div className="font-fs-l text-pink-800 text-14">{props.name}</div>
            <div className="font-fs-sb text-pink-500 text-16">{props.value}%</div>
        </div>
    )
}