import { ReactNode } from "react"

export default function SettingsConatiner(
    props: {
        title: string
        content: ReactNode
        children: ReactNode
    }) {
    return (
         <div className="flex flex-col bg-beige-200 px-5 py-4 rounded-xl gap-3">
            <div className="flex justify-between">
                <div className="font-fs-m text-20 text-black-1">{props.title}</div>
                <div className="">{props.content}</div>
            </div>
            {props.children}
            </div>
    )
}