export default function Default(props: {
    children: string,
    onClick?: () => any
}) {
    return (
        <button
            onClick={props.onClick && props.onClick}
            className={`
                flex items-center justify-center
                bg-black text-white rounded-2xl
                cursor-pointer overflow-hidden font-ohsquare
                text-r20 p-5 w-full`}
            style={{ maxWidth: 353 }}
        >
            {props.children}
        </button>
    );
}
