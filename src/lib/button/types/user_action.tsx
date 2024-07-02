import Icons, { IconName } from "@/lib/icons"

export default function UserAction(props: {
    children: string,
    iconType: IconName,
}) {
    const NewIcon = Icons[props.iconType]
    return (
        <button className="flex gap-3 items-center px-5 py-3 rounded-full border-white-50 border-2 bg-white-12">
            {NewIcon}
            <div className="text-m22 text-black font-fs-m">{props.children}</div>
        </button>
    )
}