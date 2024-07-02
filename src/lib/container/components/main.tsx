import { ReactNode } from "react"
import Header from "./header"

export default function Main(props:{
    children: ReactNode,
    headerTitle: string
}){
    return (
        <div className={`flex flex-col h-screen w-screen px-5 bg-gradient-1 pb-10`} style={{ maxWidth: 393, margin: "0 auto" }}>
            <Header>{props.headerTitle}</Header>
            {props.children}
        </div>
    )
}