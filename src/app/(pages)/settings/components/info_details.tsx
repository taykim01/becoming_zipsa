export default function InfoDetails(props: {
    title: string
    content: string
}) {

    return (
        <div className="flex justify-between px-3 py-2 bg-white-0.4 rounded-md">
            <div className="font-fs-m text-14 text-gray-2002">
                {props.title}
            </div>
            <div className="font-fs-m text-14 text-pink-10">
                {props.content}
            </div>
        </div>
    )
}