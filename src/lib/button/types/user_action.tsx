import Icons, { IconName } from "@/lib/icons"

export default function UserAction(props: {
    children: string,
    iconType: IconName,
    textColor?: "white" | "black",
    onClick: () => void
}) {
    const NewIcon = Icons[props.iconType]
    return (
        <button
            onClick={props.onClick}
            className={`
                    flex gap-3 justify-center items-center w-full
                    px-4 py-2 rounded-full border-white-50 border-2 bg-white-12
                    active:bg-pink-50
                `}
        >
            {NewIcon}
            <div className={`
                    text-m18 font-fs-m active:text-pink-100 active:font-fs-sb active:text-sb20
                    ${props.textColor === 'black' ? 'text-black' : 'text-white'}
                `}>{props.children}</div>
        </button>
    )
}