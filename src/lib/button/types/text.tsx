export default function Text(props: {
    onClick: () => void,
    children: string
}) {
    return (
        <div
            className="font-fs-r text-gray-dark text-r16 cursor-pointer"
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}