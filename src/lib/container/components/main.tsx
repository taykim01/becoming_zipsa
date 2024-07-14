import { ReactNode } from "react"
import Header from "./header"

export default function Main(props: {
    children: ReactNode,
    headerTitle: string,
    bgClass?: string
    badge?: boolean,
    back?: boolean,
    titleColor?: "white" | "black"
}) {
    const backgroundClass = props.bgClass || "bg-type1_light";
    `${props.titleColor}`
    return (
        <div className={`flex flex-col justify-between items-center h-full w-screen px-5 ${backgroundClass} py-8 overflow-hidden`}>
            <Header badge={props.badge} back={props.back} titleColor={props.titleColor}>{props.headerTitle}</Header>
            <div className="flex flex-col justify-between overflow-hidden w-full h-full" style={{ maxWidth: 393 }}>
                {props.children}
            </div>
        </div>
    )
}