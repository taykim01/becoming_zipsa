import { ReactNode } from "react"
import Header from "./components/header"

export default function Container(props:{
    children: ReactNode,
    headerTitle: string
}){
    return (
        <div className={`h-screen w-screen px-5 bg-gradient-1 pb-10`} style={{ maxWidth: 393 }}>
            <Header>{props.headerTitle}</Header>
            {props.children}
        </div>
    )
}