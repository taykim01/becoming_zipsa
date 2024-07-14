"use client"

import Button from "@/lib/button";
import { catResponseState } from "@/recoil/cat_response";
import ChatBox from "@/lib/chat_box";
import Input from "@/lib/input";
import { useEffect, useState } from "react";
import Components from ".";
import { IconName } from "@/lib/icons";
import { useRecoilState, useSetRecoilState } from "recoil";
import { catFeelingState } from "@/recoil/cat_feeling";
import { Cat } from "@/repository/v1.0.0/cat/cat";
import { loadingState } from "@/recoil/loading";
import ActionsToCat from "@/repository/v1.0.0/cat/actions_to_cat";
import ReadCat from "@/repository/v1.0.0/cat/read_cat";
import ChatWithCat from "@/repository/v1.0.0/cat/chat_with_cat";
import html2canvas from "html2canvas";
import { chatOrActionState } from "@/recoil/chat_or_action";
import Popup from "@/lib/popup";
import CheckCat from "@/utils/check_cat";

export interface Chat {
    role: "user" | "assistant"
    content: string
}

const actions = ["간식주기", "밥주기", "쓰다듬기", "사냥놀이", "빗어주기", "사진찍기"] as const

export type CatActionTypes = typeof actions[number]

const iconByAction: Record<CatActionTypes, IconName> = {
    "간식주기": "Cake",
    "밥주기": "Pipette",
    "쓰다듬기": "Hand",
    "사냥놀이": "Fish",
    "빗어주기": "Comb",
    "사진찍기": "Camera"
}

export default function InteractionGroup() {
    const cat_with_chat = new ChatWithCat()
    const read_cat = new ReadCat()
    const actions_to_cat = new ActionsToCat()


    const [chatOrAction, setChatOrAction] = useRecoilState<"chat" | "action">(chatOrActionState)
    const [seeStatus, setSeeStatus] = useState(false)
    const [chat, setChat] = useState<Chat[]>([])
    const setLoading = useSetRecoilState(loadingState)
    const setCatResponse = useSetRecoilState(catResponseState)
    const setCatFeeling = useSetRecoilState(catFeelingState)
    const [chatLoading, setChatLoading] = useState(false)
    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: ""
    })


    const [catData, setCatData] = useState({} as Cat)
    const readCatData = async () => {
        setLoading(true)
        const response = await read_cat.read()
        if (!response.success) {
            setErrorPopup({
                open: true,
                title: "오류가 발생했어요!",
                children: response.message
            })
            return
        }
        setCatData(response.data)
        const catChat = response.data.catChat ? response.data.catChat.reverse() : []
        setChat(catChat)
        setLoading(false)
    }


    const sendChat = async (message: string) => {
        setChatLoading(true)
        setChat([{ role: "user", content: message }, ...chat])
        const response = await cat_with_chat.chat(
            message
        )
        if (!response.success) {
            setErrorPopup({
                open: true,
                title: "오류가 발생했어요!",
                children: response.message
            })
            setChatLoading(false)
            return
        }
        const catChat = response.data.catChat
        const responsePolarity = response.data.responsePolarity
        if (responsePolarity === "positive") setCatFeeling("positive")
        setChat([{ role: "assistant", content: catChat }, { role: "user", content: message }, ...chat])
        setChatLoading(false)
    }


    const catAction = async (action: CatActionTypes) => {
        try {
            const response = await actions_to_cat.applyAction(action)
            const catFeeling = response.data.catFeelingRes
            const catResponse = response.data.catResponse
            setCatFeeling(catFeeling)
            if (!response.success) {
                setErrorPopup({
                    open: true,
                    title: "오류가 발생했어요!",
                    children: response.message
                })
                return
            }
            setCatResponse(catResponse)
        } catch (error) {
            setErrorPopup({
                open: true,
                title: "오류가 발생했어요!",
                children: "일시적인 오류가 발생했습니다. 관리자에게 문의주세요."
            })
        }
    }


    const takeScreenshot = async () => {
        const height = 400

        const containerElement = document.getElementById('screencaptureArea');
        if (!containerElement) {
            console.error("Container element not found");
            return;
        }

        setTimeout(() => {
            html2canvas(containerElement, {
                backgroundColor: "#ffc3ad",
                height: height,
                width: document.documentElement.clientWidth,
                scrollY: -window.scrollY,
                windowHeight: height,
                useCORS: true
            }).then(canvas => {
                const dataURL = canvas.toDataURL("image/jpeg");
                const link = document.createElement("a");
                link.href = dataURL;
                link.download = "screenshot_top_100px.jpeg";
                link.click();
            }).catch(error => {
                console.error("Screenshot error", error);
            });
        }, 1500);
    };



    useEffect(() => {
        readCatData()
    }, [])


    return (
        <>
            <div className="flex flex-col justify-between w-full items-center flex-grow relative gap-5">
                {
                    seeStatus
                        ? <div className="w-full flex-grow flex flex-col items-center justify-between gap-5">
                            <Components.GaugeGroup />
                            <Button.Default onClick={() => setSeeStatus(false)}>{`${catData.name}(이)랑 놀기`}</Button.Default>
                        </div>
                        : <>
                            {chatOrAction === "chat" && <div className="relative w-full h-full">
                                <div className="absolute flex flex-col gap-2 flex-grow w-full overflow-scroll h-full" style={{ flexDirection: "column-reverse" }}>
                                    {chat.map((chat, index) => {
                                        if (chat.role === "user") return (
                                            <div key={index} className="w-full flex justify-end">
                                                <ChatBox.UserChatBox>{chat.content}</ChatBox.UserChatBox>
                                            </div>
                                        )
                                        else return (
                                            <ChatBox.CatChatBox key={index}>{chat.content}</ChatBox.CatChatBox>
                                        )
                                    })}
                                </div>
                            </div>
                            }


                            <div className="flex flex-col justify-end w-full gap-4 flex-grow">
                                {
                                    chatOrAction === "action"
                                        ? <div className="grid grid-cols-2 grid-rows-3 gap-4">
                                            {
                                                actions.map((action, index) => {
                                                    if (action === "사진찍기") return <Button.UserAction key={index} onClick={() => { catAction(action); takeScreenshot() }} iconType={iconByAction[action]} textColor="black">{action}</Button.UserAction>
                                                    else return <Button.UserAction key={index} onClick={() => catAction(action)} iconType={iconByAction[action]} textColor="black">{action}</Button.UserAction>
                                                })
                                            }
                                            <div />
                                            <Button.UserAction onClick={() => setChatOrAction("chat")} iconType="Back" textColor="black">돌아가기</Button.UserAction>
                                        </div>
                                        : <div className="flex gap-4 items-center">
                                            <Button.UserAction onClick={() => setSeeStatus(true)} iconType="Status" textColor="black">상태 보기</Button.UserAction>
                                            <Button.UserAction onClick={() => setChatOrAction("action")} iconType="Box" textColor="black">놀아주기</Button.UserAction>
                                        </div>
                                }
                                {chatOrAction === "chat" && <Input.Message onSend={sendChat} chatLoading={chatLoading} />}
                            </div>
                        </>
                }
            </div>
            <Popup.Default
                open={errorPopup.open}
                onClose={() => setErrorPopup({ ...errorPopup, open: false })}
                title={errorPopup.title}
            >
                {errorPopup.children}
            </Popup.Default>
            <CheckCat for="no_cat" response="both" content="adopt-cat" />
        </>
    )
}