import { ReactNode } from "react"
import Header from "./header"

export default function Main(props:{
    children: ReactNode,
    headerTitle: string,
    bgClass?: string
    badge?: boolean,
    back?: boolean
}){
    const backgroundClass = props.bgClass || "bg-type1_light";
    return (
<<<<<<< HEAD
        <div className={`flex flex-col h-full w-screen px-5 ${backgroundClass} py-8`} style={{ maxWidth: 393}}>
=======
        <div className={`flex flex-col justify-between h-full w-screen px-5 ${backgroundClass} py-8 overflow-hidden`} style={{ maxWidth: 393}}>
>>>>>>> origin/screenshot
            <Header badge={props.badge} back={props.back}>{props.headerTitle}</Header>
            {props.children}
        </div>
    )
}