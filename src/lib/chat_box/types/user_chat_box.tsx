export default function UserChatBox(props: {
    children: string,
}) {
    return (
        <div className="w-fit inline-flex py-2 px-5 justify-center items-center rounded-2xl rounded-br-none bg-[#FFF2F2] text-16 text-black-1 font-fs-r">{props.children}</div>
    );
}
