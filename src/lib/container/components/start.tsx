import { ReactNode } from "react";

export default function Start(props: { children: ReactNode }) {
    return (
        <div
            className="flex flex-col items-center justify-between h-full w-screen px-5 pb-8 pt-40 bg-type1_dark"
            style={{ overflow: "hidden", zIndex: 1000}}
        >
            {props.children}
        </div>
    );
}