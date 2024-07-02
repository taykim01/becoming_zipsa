export default function UserChatBox(props: {
    children: string,
}) {
    return (
        <div  className="inline-flex py-2 px-5 justify-center items-center rounded-2xl rounded-br-none bg-[#FFF2F2] text-r16 text-black font-fs-r">{props.children}</div>
    );
}
