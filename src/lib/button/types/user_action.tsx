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
                    px-4 py-2 border-beige-50 bg-white-0.12
                    active:bg-pink-0.15
                    active:text-pink-100
                    active:border-pink-0.6
                `}
            style={{ borderWidth: 3, borderRadius: 20 }}
        >
            {NewIcon}
            <div className={`
                    text-18 font-fs-m
                    ${props.textColor === 'black' ? 'text-black-1' : 'text-white-1'}
                `}>{props.children}</div>
        </button>
    )
}