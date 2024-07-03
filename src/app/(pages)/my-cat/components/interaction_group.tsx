"use client"

import Button from "@/lib/button";
import CatResponse from "@/lib/cat_response";
import ChatBox from "@/lib/chat_box";
import Input from "@/lib/input";
import { Component, useState } from "react";
import Components from ".";

interface Chat {
    side: "user" | "cat"
    message: string
}

export default function InteractionGroup() {
    const sampleChat: Chat[] = [
        { side: "cat", message: "애옹" },
        { side: "user", message: "안녕" },
        { side: "cat", message: "애옹" },
        { side: "user", message: "배고파?" },
        { side: "cat", message: "애옹" },
        { side: "user", message: "놀아줄까?" },
        { side: "cat", message: "애옹" },
        { side: "user", message: "사진찍자" },
    ]
    const [buttonDetail, setButtonDetail] = useState(false)
    const [seeStatus, setSeeStatus] = useState(false)
    const [chat, setChat] = useState<Chat[]>(sampleChat)

    const sendChat = (message: string) => {
        setChat([{ side: "cat", message: "애옹" }, { side: "user", message }, ...chat])
    }

    return (
        <div className="flex flex-col justify-between w-full items-center flex-grow">

            {
                seeStatus
                    ? <div className="w-full flex-grow flex flex-col justify-between">
                        <Components.GaugeGroup />
                        <Button.Default onClick={() => setSeeStatus(false)}>_____랑 놀기</Button.Default>
                    </div>
                    : <>
                        {buttonDetail
                            ? <CatResponse name="고양이">애옹</CatResponse>
                            : <div className="flex flex-col gap-2 w-full flex-grow overflow-scroll" style={{ maxHeight: "28vh", flexDirection: "column-reverse" }}>
                                {chat.map((chat, index) => {
                                    if (chat.side === "user") return (
                                        <div key={index} className="w-full flex justify-end">
                                            <ChatBox.UserChatBox>{chat.message}</ChatBox.UserChatBox>
                                        </div>
                                    )
                                    else return (
                                        <ChatBox.CatChatBox key={index}>{chat.message}</ChatBox.CatChatBox>
                                    )
                                })}
                            </div>
                        }


                        <div className="flex flex-col justify-end w-full gap-4 flex-grow">
                            {
                                buttonDetail
                                    ? <div className="grid grid-cols-2 grid-rows-3 gap-4">
                                        <Button.UserAction onClick={() => { }} iconType="Cake" textColor="black">간식주기</Button.UserAction>
                                        <Button.UserAction onClick={() => { }} iconType="Pipette" textColor="black">밥 주기</Button.UserAction>
                                        <Button.UserAction onClick={() => { }} iconType="Hand" textColor="black">쓰다듬기</Button.UserAction>
                                        <Button.UserAction onClick={() => { }} iconType="Fish" textColor="black">사냥놀이</Button.UserAction>
                                        <Button.UserAction onClick={() => { }} iconType="Comb" textColor="black">빗어주기</Button.UserAction>
                                        <Button.UserAction onClick={() => { }} iconType="Camera" textColor="black">사진찍기</Button.UserAction>
                                        <div />
                                        <Button.UserAction onClick={() => setButtonDetail(false)} iconType="Back" textColor="black">돌아가기</Button.UserAction>
                                    </div>
                                    : <div className="flex gap-4 items-center">
                                        <Button.UserAction onClick={() => setSeeStatus(true)} iconType="Status" textColor="black">상태 보기</Button.UserAction>
                                        <Button.UserAction onClick={() => setButtonDetail(true)} iconType="Box" textColor="black">놀아주기</Button.UserAction>
                                    </div>
                            }
                            {!buttonDetail && <Input.Message onSend={sendChat} />}
                        </div></>
            }
        </div>
    )
}