export default function CatResponse(props: {
    children: string,
}) {
    return (
        <div className={`
                flex items-center justify-center w-fit
                bg-white bg-opacity-50
                cursor-pointer overflow-hidden
                font-fs-m text-m20 text-black px-[20px] py-[6px]
                border-4 border-white border-opacity-20 
                rounded-[20px]
            `}
            style={{ maxWidth: 353 }}
        >
            {props.children}
        </div>
    )
}