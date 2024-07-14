"use client"

import { ReactNode } from "react";
import "./popup.css";
import Drawer from "@mui/material/Drawer";
import React from "react";

export default function Default(props: {
    children: ReactNode,
    open: boolean,
    onClose: () => any,
    title: string,
}) {
    return (
        <Drawer
            anchor="bottom"
            open={props.open}
            onClose={props.onClose}
            PaperProps={{
                className: 'modal-cont'
            }}
        >
            <div className="flex flex-col">
                <div className="flex items-center bg-beige w-full h-fit p-5">
                    <div className="flex-1" />
                    <div className="flex-5 text-center text-black-1 font-ohsquare text-20">{props.title}</div>
                    <div className="flex-1 flex justify-end">
                        <button className="ml-auto" onClick={props.onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 18L6 6" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 6L5.99997 18" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="p-5">
                    {props.children}
                </div>
            </div>
        </Drawer >
    )
}