export default function Default(props: {
    children: string,
    onClick?: () => any
}) {
    return (
        <button
            onClick={props.onClick && props.onClick}
            className={`
                flex items-center justify-center
                bg-black-1 text-white-1 rounded-2xl
                active:bg-black-0.7 transition-all duration-100 ease-out
                cursor-pointer overflow-hidden font-ohsquare
                flex-shrink-0 text-20 px-5 py-3 w-full`}
            style={{ maxWidth: 353 }}
        >
            {props.children}
        </button>
    );
}
