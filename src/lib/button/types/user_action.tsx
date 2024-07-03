import Icons, { IconName } from "@/lib/icons"

export default function UserAction(props: {
    children: string,
    iconType: IconName,
    textColor?:"white"|"black"
}) {
    const NewIcon = Icons[props.iconType]
    return (
        <button className="flex gap-3 justify-center items-center w-full px-5 py-3 rounded-full border-white-50 border-2 bg-white-12">
            {NewIcon}
            <div className={`text-m22 font-fs-m ${props.textColor === 'black' ? 'text-black' : 'text-white'}`}>{props.children}</div>
        </button>
    )
}