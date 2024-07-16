import React from "react"

export default function SexSymbol(props: { sex: "수컷" | "암컷" }) {
    if (props.sex === "수컷") {
        return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
            <path d="M9.53035 8.96973C8.06588 7.50527 5.6915 7.50528 4.22705 8.96973C2.76259 10.4342 2.76258 12.8086 4.22705 14.273C5.6915 15.7375 8.06589 15.7375 9.53035 14.273C10.9948 12.8086 10.9948 10.4342 9.53035 8.96973ZM9.53035 8.96973L13.773 4.72709M13.773 4.72709V8.96973M13.773 4.72709H9.53035" stroke="#7E7E7E" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    } else return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
        <path d="M6.75 14H11.25M9 10.25V16.25M9 10.25C11.071 10.25 12.75 8.57105 12.75 6.5C12.75 4.42893 11.071 2.75 9 2.75C6.92893 2.75 5.25 4.42893 5.25 6.5C5.25 8.57105 6.92893 10.25 9 10.25Z" stroke="#7E7E7E" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}