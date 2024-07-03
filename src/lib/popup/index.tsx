"use client"

import { ReactNode } from "react";
import "./popup.css";
import Drawer from "@mui/material/Drawer";

export default function Popup(props: {
    children : ReactNode, 
    open:boolean,
    onClose:()=>any
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
            {props.children}
        </Drawer >
    )
}