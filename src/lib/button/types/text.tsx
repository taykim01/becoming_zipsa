export default function Text(props: {
    onClick: () => void,
    children: string
}) {
    return (
        <div
            className="font-fs-r text-gray-500 text-16 cursor-pointer"
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}