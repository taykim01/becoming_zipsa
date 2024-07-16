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
import takeScreenshot from "@/utils/take_screenshot";
import { chatOrActionState } from "@/recoil/chat_or_action";
import CheckCat from "@/utils/check_cat";
import StatusBox from "@/lib/status_box";
import { seeStatusState } from "@/recoil/see_status";
import ChatLoading from "@/lib/chat_loading";
import { useRouter } from "next/navigation";
import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup";


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


    const router = useRouter()
    const [chatOrAction, setChatOrAction] = useRecoilState<"chat" | "action">(chatOrActionState)
    const [seeStatus, setSeeStatus] = useRecoilState(seeStatusState)
    const [chat, setChat] = useState<Chat[]>([])
    const setLoading = useSetRecoilState(loadingState)
    const setCatResponse = useSetRecoilState(catResponseState)
    const setCatFeeling = useSetRecoilState(catFeelingState)
    const [chatLoading, setChatLoading] = useState(false)
    const raiseErrorPopup = useRaiseErrorPopup()


    const [catData, setCatData] = useState({} as Cat)
    const readCatData = async (reload?: boolean) => {
        try {
            setLoading(true)
            const response = await read_cat.read(reload)
            if (!response.success) {
                raiseErrorPopup(response.message)
                return
            }
            setCatData(response.data)
            const catChat = response.data.chats ? response.data.chats.reverse() : []
            setChat(catChat)
        } catch (error) {
            raiseErrorPopup(String(error))
        } finally {
            setLoading(false)
        }
    }


    const sendChat = async (message: string) => {
        try {
            setChatLoading(true)
            setChat([{ role: "user", content: message }, ...chat]) // 여기까지 맞음
            const response = await cat_with_chat.chat(
                message
            )
            if (!response.success) {
                if (response.data === "cat_leave") {
                    router.push("/my-cat/event/leave")
                    return
                }
                raiseErrorPopup(response.message)
                return
            }
            const catChat = response.data.catChat
            console.log(catChat)
            const responsePolarity = response.data.responsePolarity
            if (responsePolarity === "positive") setCatFeeling("positive")
            setChat([{ role: "assistant", content: catChat }, { role: "user", content: message }, ...chat]) // 여기부턴 틀림
            readCatData()
        } catch (error) {
            raiseErrorPopup(String(error))
        } finally {
            setChatLoading(false)
        }
    }

    useEffect(() => {
        console.log(chat)
    }, [chat])


    const catAction = async (action: CatActionTypes) => {
        try {
            setLoading(true)
            const response = await actions_to_cat.applyAction(action)
            const catFeeling = response.data.catFeelingRes
            const catResponse = response.data.catResponse
            setCatFeeling(catFeeling)
            if (!response.success) {
                raiseErrorPopup(response.message)
                return
            }
            setCatResponse(catResponse)
            readCatData()
        } catch (error) {
            raiseErrorPopup("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        readCatData(true)
    }, [])


    return (
        <>
            <div className="flex items-center gap-4 w-full">
                <StatusBox name="애정도" value={catData.affection} />
                <StatusBox name="포만감" value={catData.hunger} />
                <StatusBox name="체력" value={catData.health} />
            </div>
            <div className="flex flex-col justify-between w-full items-center flex-grow relative gap-3">
                {
                    seeStatus
                        ? <div className="w-full flex-grow flex flex-col items-center justify-between gap-5">
                            <Components.GaugeGroup />
                            <Button.Default onClick={() => setSeeStatus(false)}>{`${catData.name}(이)랑 놀기`}</Button.Default>
                        </div>
                        : <>
                            {
                                chatOrAction === "chat" && <div className="relative w-full h-full">
                                    {chatLoading && <ChatLoading />}
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
                                        ? <div className="grid grid-cols-2 grid-rows-3 gap-4 w-full">
                                            {
                                                actions.map((action, index) => {
                                                    if (action === "사진찍기") return <Button.UserAction key={index} onClick={() => { catAction(action); takeScreenshot(catData.name) }} iconType={iconByAction[action]} textColor="black">{action}</Button.UserAction>
                                                    else return <Button.UserAction key={index} onClick={() => catAction(action)} iconType={iconByAction[action]} textColor="black">{action}</Button.UserAction>
                                                })
                                            }
                                            <div />
                                            <Button.UserAction onClick={() => setChatOrAction("chat")} iconType="Back" textColor="black">돌아가기</Button.UserAction>
                                        </div>
                                        : <></>
                                }
                                {chatOrAction === "chat" && <Input.Message onSend={sendChat} left1Click={() => setSeeStatus(true)} left2Click={() => setChatOrAction("action")} />}
                            </div>
                        </>
                }
            </div>
            <CheckCat for="no_cat" response="both" content="adopt-cat" />
        </>
    )
}