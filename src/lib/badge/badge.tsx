export default function Badge(props: {
    badgeTitle:string
    badgeDetail:string
}) {
    return (
        <div className="inline-flex py-[7px] pr-[29px] pl-[9px] items-center gap-[124px] rounded-full bg-white-40">
            <div className="flex w-[90px] h-[90px] py-[5px] px-[9px] justify-center items-center rounded-full bg-white-80">
            img
            </div>
            <div className="inline-flex flex-col justify-items-center">
                <div className="text-sb20 text-black font-fs-sb">{props.badgeTitle}</div>
                <div className="text-r14 text-black font-fs-r text-right">{props.badgeDetail}</div>
            </div>
        </div>
    );
}
