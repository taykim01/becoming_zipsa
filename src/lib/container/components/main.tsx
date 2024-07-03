// import { ReactNode } from "react"
// import Header from "./header"

// export default function Main(props:{
//     children: ReactNode,
//     headerTitle: string,
//     bgClass?: string
// }){
//     const backgroundClass = props.bgClass || "bg-gradient-1";
//     return (
//         <div className={`h-screen w-screen px-5 ${backgroundClass} pb-10`} style={{ maxWidth: 393, margin: "0 auto" }}>
//             <Header>{props.headerTitle}</Header>
//             {props.children}
//         </div>
//     )
// }

import { ReactNode } from "react"
import Header from "./header"

export default function Main(props:{
    children: ReactNode,
    headerTitle: string,
    bgClass?: string
    badge?: boolean,
    back?: boolean
}){
    const backgroundClass = props.bgClass || "bg-gradient-1";
    return (
        <div className={`flex flex-col h-screen w-screen px-5 ${backgroundClass} pb-10`} style={{ maxWidth: 393, margin: "0 auto" }}>
            <Header badge={props.badge} back={props.back}>{props.headerTitle}</Header>
            {props.children}
        </div>
    )
}