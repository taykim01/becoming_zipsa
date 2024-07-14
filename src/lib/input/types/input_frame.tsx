import { ReactNode } from "react"

export default function InputFrame(props: {
    title?: string,
    guide?: string,
    guideClick?: () => void,
    children: ReactNode,
    info?: string
}) {
    return (
        <div className="flex flex-col gap-2 w-full" style={{ maxWidth: 353 }}>
            <div className="flex justify-between items-center">
                {props.title && <div className="text-pink-500 fs-r text-18">{props.title}</div>}
                {
                    props.guide && <div className="flex gap-1 items-center" onClick={props.guideClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#9F4E4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z" fill="#9F4E4F" />
                            <path d="M10.5858 8.11423C10.9754 7.7246 11.4858 7.52934 11.9965 7.52844C12.5095 7.52754 13.0228 7.7228 13.4142 8.11423C13.8047 8.50475 14 9.0166 14 9.52844C14 10.0403 13.8047 10.5521 13.4142 10.9427C13.0228 11.3341 12.5095 11.5293 11.9965 11.5284L12 13.5284" stroke="#9F4E4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="text-pink-500 text-14">{props.guide}</div>
                    </div>
                }
            </div>
            {props.children}
            {props.info && <div className="text-pink-0.8 fs-l text-14 text-right w-full">{props.info}</div>}
        </div>
    )
}