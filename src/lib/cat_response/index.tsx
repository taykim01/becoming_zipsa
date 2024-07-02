export default function CatResponse(props: {
    children: string,
}) {
    return (
        <div className={`
            flex items-center justify-center
            bg-white bg-opacity-50
            cursor-pointer overflow-hidden
            font-fs-m text-r20 text-black
            w-full px-[20px] py-[6px]
            border-4 border-white border-opacity-20 
            rounded-[20px]`}
            style={{ maxWidth: 172 }}
        >
            {props.children}

        </div>
    )
}