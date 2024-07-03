export default function CatResponse(props: {
    children: string,
    name: string
}) {
    return (
        <div className={`
                flex items-center justify-center w-fit gap-3
                bg-white bg-opacity-50
                cursor-pointer overflow-hidden
                font-fs-r text-r14 text-black px-[20px] py-[6px]
                border-4 border-white border-opacity-20 
                rounded-[20px]
            `}
            style={{ maxWidth: 353 }}
        >
            <div className="fs-l text-l12 text-pink-main">{props.name}</div>
            {props.children}
        </div>
    )
}