"use client"

import Button from "@/lib/button";
import CatResponse from "@/lib/cat_response";
import ChatBox from "@/lib/chat_box";
import Input from "@/lib/input";
import { useEffect, useState } from "react";
import Components from ".";
import ChatWithCatUseCase from "@/domain/use_case/cat/chat_with_cat_use_case";
import ReadCatUseCase from "@/domain/use_case/cat/read_cat_use_case";
import Loading from "@/lib/loading";
import ActionsToCatUseCase from "@/domain/use_case/cat/actions_to_cat_use_case";

export interface Chat {
    who: "user" | "cat"
    chat: string
}

export default function InteractionGroup() {
    const cat_with_chat_use_case = new ChatWithCatUseCase()
    const read_cat_use_case = new ReadCatUseCase()
    const actions_to_cat_use_case = new ActionsToCatUseCase()

    const [buttonDetail, setButtonDetail] = useState(false)
    const [seeStatus, setSeeStatus] = useState(false)
    const [chat, setChat] = useState<Chat[]>([])
    const [loading, setLoading] = useState(false)
    const [catActionRes, setCatActionRes] = useState("애옹")

    const [catData, setCatData] = useState<CatModel>({} as CatModel)
    const readCatData = async () => {
        setLoading(true)
        const response = await read_cat_use_case.read()
        if (!response.success) {
            alert(response.message)
            return
        }
        setCatData(response.data)
        const catChat = response.data.catChat.reverse()
        setChat(catChat)
        setLoading(false)
    }

    const sendChat = async (message: string) => {
        setChat([{ who: "user", chat: message }, ...chat])
        const response = await cat_with_chat_use_case.chat(
            message,
            catData.catName,
            catData.catChapter,
            catData.sex,
            chat
        )
        if (!response.success) {
            alert(response.message)
            return
        }
        const catChat = response.data
        setChat([{ who: "cat", chat: catChat }, { who: "user", chat: message }, ...chat])
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
                            <Button.Default onClick={() => setSeeStatus(false)}>{`${catData.catName}(이)랑 놀기`}</Button.Default>
                        </div>
                        : <>
                            {buttonDetail
                                ? <CatResponse name={catData.catName}>{catActionRes}</CatResponse>
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
                                            <Button.UserAction onClick={() => { actions_to_cat_use_case.applyAction("giveSnack",); setCatActionRes("giveSnack") }} iconType="Cake" textColor="black">간식주기</Button.UserAction>
                                            <Button.UserAction onClick={() => { actions_to_cat_use_case.applyAction("giveFood",) }} iconType="Pipette" textColor="black">밥 주기</Button.UserAction>
                                            <Button.UserAction onClick={() => { actions_to_cat_use_case.applyAction("pat",) }} iconType="Hand" textColor="black">쓰다듬기</Button.UserAction>
                                            <Button.UserAction onClick={() => { actions_to_cat_use_case.applyAction("play",) }} iconType="Fish" textColor="black">사냥놀이</Button.UserAction>
                                            <Button.UserAction onClick={() => { actions_to_cat_use_case.applyAction("brush",) }} iconType="Comb" textColor="black">빗어주기</Button.UserAction>
                                            <Button.UserAction onClick={() => { actions_to_cat_use_case.applyAction("") }} iconType="Camera" textColor="black">사진찍기</Button.UserAction>
                                            <div />
                                            <Button.UserAction onClick={() => setButtonDetail(false)} iconType="Back" textColor="black">돌아가기</Button.UserAction>
                                        </div>
                                        : <div className="flex gap-4 items-center">
                                            <Button.UserAction onClick={() => setSeeStatus(true)} iconType="Status" textColor="black">상태 보기</Button.UserAction>
                                            <Button.UserAction onClick={() => setButtonDetail(true)} iconType="Box" textColor="black">놀아주기</Button.UserAction>
                                        </div>
                                }
                                {!buttonDetail && <Input.Message onSend={sendChat} />}
                            </div>
                        </>
                }
            </div>
            {loading && <Loading />}
        </>
    )
}