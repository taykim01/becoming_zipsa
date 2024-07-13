function Indicator(props: {
    value: number
}) {
    return (
        <div className="relative">
            <div className="font-fs-sb text-sb10 text-pink-300 w-full text-center absolute" style={{
                margin: "0 auto",
                top: "-15px",
                }}>{props.value}%</div>
            <div className="flex justify-center items-center rounded-full border-pink-300 border-2">
                <div className="flex justify-center items-center rounded-full bg-beige p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path d="M4.19408 15.891C5.4523 16.5997 6.86431 16.9692 8.27632 17C8.34622 17 8.4301 17 8.5 17C9.92599 17 11.338 16.6611 12.6242 15.9834C13.7984 15.3673 14.861 14.4432 15.6441 13.288C16.5387 11.9632 17 10.377 17 8.72873C17 7.68137 17 6.64941 17 5.60204C17 4.46226 17 3.33788 17 2.1981C17 1.79764 17 1.39717 17 1.01211C17 0.288198 16.3431 -0.189277 15.7418 0.0725642L12.5543 1.5358C12.3446 1.62821 12.1069 1.64361 11.8972 1.5512C10.8627 1.10453 9.71628 0.873491 8.5 0.873491C7.28372 0.873491 6.13734 1.11993 5.1028 1.5512C4.89309 1.64361 4.65543 1.62821 4.44572 1.5358L1.25822 0.118926C0.657072 -0.158318 0 0.33456 0 1.05847C0 1.59756 0 2.15205 0 2.69113C0 3.81551 0 4.93989 0 6.07967C0 7.03462 0 7.97417 0 8.92912C0 10.454 0.447368 11.9326 1.24424 13.1648C1.99918 14.32 3.03372 15.2441 4.19408 15.891ZM11.6036 8.75969C12.3725 8.75969 13.0016 9.4528 13.0016 10.2999C13.0016 11.1471 12.3725 11.8402 11.6036 11.8402C10.8347 11.8402 10.2056 11.1471 10.2056 10.2999C10.2056 9.43756 10.8347 8.75969 11.6036 8.75969ZM5.39638 8.75969C6.1653 8.75969 6.79441 9.4528 6.79441 10.2999C6.79441 11.1471 6.1653 11.8402 5.39638 11.8402C4.62747 11.8402 3.99836 11.1471 3.99836 10.2999C3.99836 9.43756 4.62747 8.75969 5.39638 8.75969Z" fill="#E3AE99" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default function Gauge(props: {
    value: number,
    title: string
}) {
    return (
        <div className="flex flex-col gap-4" style={{ maxWidth: 353 }}>
            <div className="text-pink-500 text-r18">{props.title}</div>
            <div className="border-4 rounded-full border-white-40 relative">
                <div className="absolute" style={{
                    left: `${props.value}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                }}>
                    <Indicator value={props.value} />
                </div>
                <div className="h-3 w-full bg-gradient-gauge rounded-full" style={{ width: `${props.value}%` }} />
            </div>
        </div>
    )
}