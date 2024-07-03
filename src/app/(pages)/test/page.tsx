"use client"
import Popup from "@/lib/popup";
import { useState } from "react";

export default function Page(){
    const [modal,setModal] = useState(false)
    return(
        <>
        <Popup
        open={modal}
        onClose={()=>setModal(false)}>
        <div className="flex flex-col">
            <Header/>
            <div className="flex flex-col gap-5 p-5 ">
                <CatListItem cat="치즈냥이" detail="활발함,응성받이, 소심"></CatListItem>
                <CatListItem cat="깜냥이" detail="똑똑함, 얌전함"></CatListItem>
                <CatListItem cat="흰냥이" detail="수줍음, 겁많음, 섬세함, 느긋함"></CatListItem>
            </div>
            
        </div>
        </Popup>
        <button onClick={()=>setModal(true)}>button</button>
        </>
        
    )
}

function Header(){
    return(
        <div className="flex items-center bg-beige w-full h-fit p-4">
            <div className="flex-1 text-center text-black font-ohsquare text-n20">고양이별 성격</div>
            <button className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M18 18L6 6" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18 6L5.99997 18" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </button>
        </div>
    )
}
function CatListItem(props:{
    cat:string,
    detail:string
}){
    return(
        <div className="flex items-start justify-between gap-[10px] w-full">
        <div className="bg-pink-15 text-pink-200  font-fs-m text-m18">{props.cat}</div>
        <div className="text-black  font-fs-m text-m18">{props.detail}</div>
        </div>
    )
}