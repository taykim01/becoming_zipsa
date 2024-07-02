import { ReactNode } from "react"

export default function Start(props:{
    children: ReactNode
}){
    return (
        <div className={`h-screen w-screen px-5 bg-gradient-1 pb-10`} style={{ maxWidth: 393, margin: "0 auto" }}>
            {props.children}
        </div>
    )
}