"use client"

import Button from "@/lib/button";
import CatResponse from "@/lib/cat_response";
import ChatBox from "@/lib/chat_box";
import Input from "@/lib/input";
import { useEffect, useState } from "react";
import Components from ".";
import { IconName } from "@/lib/icons";
import { useSetRecoilState } from "recoil";
import { catFeelingState } from "@/recoil/cat_feeling";
import { Cat } from "@/repository/v1.0.0/cat/cat";
import { loadingState } from "@/recoil/loading";
import ActionsToCat from "@/repository/v1.0.0/cat/actions_to_cat";
import ReadCat from "@/repository/v1.0.0/cat/read_cat";
import ChatWithCat from "@/repository/v1.0.0/cat/chat_with_cat";
import Popup from "@/lib/popup";

export interface Chat {
    who: "user" | "cat"
    chat: string
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


    const [buttonDetail, setButtonDetail] = useState(false)
    const [seeStatus, setSeeStatus] = useState(false)
    const [chat, setChat] = useState<Chat[]>([])
    const setLoading = useSetRecoilState(loadingState)
    const [catResponse, setCatResponse] = useState("")
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
        setChat([{ who: "user", chat: message }, ...chat])
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
        setChat([{ who: "cat", chat: catChat }, { who: "user", chat: message }, ...chat])
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

    useEffect(() => {
        readCatData()
    }, [])

    return (
        <>
        <div className="flex flex-col justify-between w-full items-center flex-grow relative gap-5">
            {
                seeStatus
                    ? <div className="w-full flex-grow flex flex-col justify-between gap-5">
                        <Components.GaugeGroup />
                        <Button.Default onClick={() => setSeeStatus(false)}>{`${catData.name}(이)랑 놀기`}</Button.Default>
                    </div>
                    : <>
                        {buttonDetail
                            ? <CatResponse name={catData.name}>{catResponse}</CatResponse>
                            : <div className="relative w-full h-full">
                                <div className="absolute flex flex-col gap-2 flex-grow w-full overflow-scroll h-full" style={{ flexDirection: "column-reverse" }}>
                                    {chat.map((chat, index) => {
                                        if (chat.who === "user") return (
                                            <div key={index} className="w-full flex justify-end">
                                                <ChatBox.UserChatBox>{chat.chat}</ChatBox.UserChatBox>
                                            </div>
                                        )
                                        else return (
                                            <ChatBox.CatChatBox key={index}>{chat.chat}</ChatBox.CatChatBox>
                                        )
                                    })}
                                </div>
                            </div>
                        }


                        <div className="flex flex-col justify-end w-full gap-4 flex-grow">
                            {
                                buttonDetail
                                    ? <div className="grid grid-cols-2 grid-rows-3 gap-4">
                                        {
                                            actions.map((action, index) => (
                                                <Button.UserAction key={index} onClick={() => catAction(action)} iconType={iconByAction[action]} textColor="black">{action}</Button.UserAction>
                                            ))
                                        }
                                        <div />
                                        <Button.UserAction onClick={() => setButtonDetail(false)} iconType="Back" textColor="black">돌아가기</Button.UserAction>
                                    </div>
                                    : <div className="flex gap-4 items-center">
                                        <Button.UserAction onClick={() => setSeeStatus(true)} iconType="Status" textColor="black">상태 보기</Button.UserAction>
                                        <Button.UserAction onClick={() => setButtonDetail(true)} iconType="Box" textColor="black">놀아주기</Button.UserAction>
                                    </div>
                            }
                            {!buttonDetail && <Input.Message onSend={sendChat} chatLoading={chatLoading} />}
                        </div>
                    </>
            }
        </div>
        <Popup.Default
                open={errorPopup.open}
                onClose={() => setErrorPopup({ ...errorPopup, open: false})}
                title={errorPopup.title}
            >
                {errorPopup.children}
            </Popup.Default>
        </>
    )
}