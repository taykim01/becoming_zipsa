export default function CatResponse(props: {
    children: string,
    name?: string
}) {
    return (
        <div className={`
                flex items-center justify-center w-fit gap-3
                bg-white-0.5
                cursor-pointer overflow-hidden
                font-fs-r text-14 text-black-1 px-[20px] py-[6px]
                border-pink-0.15
                rounded-[20px]
            `}
            style={{ maxWidth: 353, borderWidth: 3 }}
        >
            {props.name && <div className="fs-l text-12 text-pink-200 flex-shrink-0">{props.name}</div>}
            {props.children}
        </div>
    )
}