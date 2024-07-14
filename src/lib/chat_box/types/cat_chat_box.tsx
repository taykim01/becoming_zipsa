export default function CatChatBox(props: {
    children: string,
}) {
    return (
        <div
            className={`
                    w-fit inline-flex py-2 px-5
                    justify-center items-center
                    rounded-2xl rounded-bl-none bg-[#FE8A8B]
                    text-16 text-black-1 font-fs-r
                    max-w-full
                `}
        >
            {props.children}
        </div>
    );
}
