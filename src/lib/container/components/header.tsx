"use client"

import { useRouter } from "next/navigation"
import { ReactNode } from "react"

function BackButton(props: {
    onClick: () => any
}) {
    return (
        <svg onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19L8 12L15 5" stroke="#17191F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function BadgeButton(props: {
    onClick: () => any
}) {
    return (
        <button onClick={props.onClick} className="px-3 py-2 bg-white-20 rounded-md flex gap-1">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="vuesax/bold/medal-star">
                    <g id="medal-star">
                        <path id="Vector" d="M15.9375 13.8526L14.7 14.1451C14.4225 14.2126 14.205 14.4226 14.145 14.7001L13.8825 15.8026C13.74 16.4026 12.975 16.5901 12.5775 16.1176L10.335 13.5376C10.155 13.3276 10.2525 12.9976 10.5225 12.9301C11.85 12.6076 13.0425 11.8651 13.92 10.8076C14.0625 10.6351 14.3175 10.6126 14.475 10.7701L16.14 12.4351C16.71 13.0051 16.5075 13.7176 15.9375 13.8526Z" fill="#1B1B1B" />
                        <path id="Vector_2" d="M2.02494 13.8526L3.26244 14.1451C3.53994 14.2126 3.75744 14.4226 3.81744 14.7001L4.07994 15.8026C4.22244 16.4026 4.98744 16.5901 5.38494 16.1176L7.62744 13.5376C7.80744 13.3276 7.70994 12.9976 7.43994 12.9301C6.11244 12.6076 4.91994 11.8651 4.04244 10.8076C3.89994 10.6351 3.64494 10.6126 3.48744 10.7701L1.82244 12.4351C1.25244 13.0051 1.45494 13.7176 2.02494 13.8526Z" fill="#1B1B1B" />
                        <path id="Vector_3" d="M9 1.5C6.0975 1.5 3.75 3.8475 3.75 6.75C3.75 7.8375 4.0725 8.835 4.6275 9.6675C5.4375 10.8675 6.72 11.715 8.2125 11.9325C8.4675 11.9775 8.73 12 9 12C9.27 12 9.5325 11.9775 9.7875 11.9325C11.28 11.715 12.5625 10.8675 13.3725 9.6675C13.9275 8.835 14.25 7.8375 14.25 6.75C14.25 3.8475 11.9025 1.5 9 1.5ZM11.295 6.585L10.6725 7.2075C10.5675 7.3125 10.5075 7.515 10.545 7.665L10.725 8.4375C10.8675 9.045 10.545 9.285 10.005 8.9625L9.255 8.52C9.12 8.4375 8.895 8.4375 8.76 8.52L8.01 8.9625C7.47 9.2775 7.1475 9.045 7.29 8.4375L7.47 7.665C7.5 7.5225 7.4475 7.3125 7.3425 7.2075L6.705 6.585C6.3375 6.2175 6.4575 5.85 6.9675 5.7675L7.77 5.6325C7.905 5.61 8.0625 5.49 8.1225 5.37L8.565 4.485C8.805 4.005 9.195 4.005 9.435 4.485L9.8775 5.37C9.9375 5.49 10.095 5.61 10.2375 5.6325L11.04 5.7675C11.5425 5.85 11.6625 6.2175 11.295 6.585Z" fill="#1B1B1B" />
                    </g>
                </g>
            </svg>
            <div className="font-fs-m text-m12">뱃지</div>
        </button>
    )
}

export default function Header(props: {
    children: ReactNode
}) {
    const router = useRouter()
    return (
        <header className="flex justify-between py-4">
            <div className="flex justify-start flex-1">
                <BackButton onClick={() => history.back()} />
            </div>
            <div className="flex justify-center flex-1">
                <div className="text-black font-ohsquare text-r20">{props.children}</div>
            </div>
            <div className="flex justify-end flex-1">
                <BadgeButton onClick={() => router.push("/my-cat/badge")} />
            </div>
        </header>
    )
}