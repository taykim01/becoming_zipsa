export default function CatChatBox(props: {
    children: string,
}) {
    return (
        <div className="w-fit inline-flex py-2 px-5 justify-center items-center rounded-2xl rounded-bl-none bg-[#FE8A8B] text-r16 text-black font-fs-r">{props.children}</div>
    );
}
