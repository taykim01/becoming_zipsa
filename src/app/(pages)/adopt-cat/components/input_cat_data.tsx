"use client"

import Button from "@/lib/button"
import CatComponent from "@/lib/cat_component"
import Input from "@/lib/input"
import Popup from "@/lib/popup"
import AdoptCat from "@/repository/v1.0.0/cat/adopt_cat"
import { CatSex, CatType } from "@/repository/v1.0.0/cat/cat"
import { useState } from "react"
import size from "@/lib/size"
import { useSetRecoilState } from "recoil"
import { errorPopupState } from "@/recoil/error_popup"
import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup"
import { loadingState } from "@/recoil/loading"
import { useLoadingRouter } from "@/hooks/use_loading_router"

type CatData = {
    name: string,
    color: string,
    sex: string,
}

export default function InputCatData() {
    const adopt_cat = new AdoptCat()


    const router = useLoadingRouter()
    const [personalityPopup, setPersonalityPopup] = useState<boolean>(false)
    const [catData, setCatData] = useState<CatData>({
        name: "",
        color: "",
        sex: "",
    })
    const setErrorPopup = useSetRecoilState(errorPopupState)
    const raiseErrorPopup = useRaiseErrorPopup();
    const setLoading = useSetRecoilState(loadingState)


    const setName = (name: CatData["name"]) => setCatData({ ...catData, name })
    const setColor = (color: CatData["color"]) => {
        if (color === "흰냥이") setCatData(prevCatData => ({
            ...prevCatData,
            color: prevCatData.color === color ? "" : color
        }))
        else setErrorPopup({
            open: true,
            title: "무료 버전은 흰냥이만 입양 가능해요.",
            children: "빠른 시일 내에 다른 냥이를 입양할 수 있게 준비할게요!"
        })
    }
    const setSex = (sex: CatData["sex"]) => setCatData(prevCatData => ({
        ...prevCatData,
        sex: prevCatData.sex === sex ? "" : sex
    }))


    const adoptCat = async () => {
        try {
            setLoading(true)
            const verifyRes = await adopt_cat.verifyInput(
                catData.name,
                catData.color as CatType,
                catData.sex as CatSex
            )
            if (!verifyRes.success) {
                raiseErrorPopup(verifyRes.message)
                return
            }
            const verification = await adopt_cat.verifyInput(
                catData.name,
                catData.color as CatType,
                catData.sex as CatSex
            )
            if (!verification.success) {
                raiseErrorPopup(verification.message)
                return
            }
            const response = await adopt_cat.adopt(
                catData.name,
                catData.color as CatType,
                catData.sex as CatSex
            )
            if (!response.success) {
                raiseErrorPopup(response.message)
                return
            }
            setErrorPopup({
                open: true,
                title: `${catData.name} 입양에 성공했어요.`,
                children: `아기 ${catData.name}(이)가 기다리고 있어요!`,
                onClose: () => router('/my-cat')
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-between flex-grow w-full gap-5">
                <div className="relative w-full h-full overflow-hidden">
                    <div className="absolute h-full w-full overflow-scroll flex flex-col gap-5 items-center">
                        {
                            catData.color
                                ? <div style={{ maxWidth: size.adoptCatVisual, maxHeight: size.adoptCatVisual }}>
                                    <CatComponent color={catData.color as CatType} />
                                </div>
                                : <div style={{ width: size.adoptCatVisual, height: size.adoptCatVisual }} />
                        }
                        <div className="flex flex-col items-center gap-4 w-full">
                            <Input.Text
                                title="고양이 이름"
                                onChange={setName}
                                placeholder="불러주고픈 이름이 있나요?"
                                onEnter={adoptCat}
                            />
                            <Input.MultiSelect
                                title="성격"
                                onSelect={setColor}
                                guide="고양이별 성격 알아보기"
                                guideClick={() => setPersonalityPopup(true)}
                                items={["흰냥이", "치즈냥이", "깜냥이"]}
                                unSelectable={["치즈냥이", "깜냥이"]}
                            />
                            <Input.MultiSelect
                                title="성별"
                                onSelect={setSex}
                                items={["수컷", "암컷"]}
                            />
                        </div>
                    </div>
                </div>
                <Button.Default onClick={adoptCat}>{`${catData.name || "_____"} 입양하기!`}</Button.Default>
            </div>
            <Popup.Default
                title="고양이별 성격 알아보기"
                open={personalityPopup}
                onClose={() => setPersonalityPopup(false)}>
                <div className="flex flex-col gap-5">
                    <CatListItem cat="흰냥이" detail="수줍음, 겁많음, 섬세함, 느긋함"></CatListItem>
                    <CatListItem cat="치즈냥이" detail="활발함,응석받이, 소심"></CatListItem>
                    <CatListItem cat="깜냥이" detail="똑똑함, 얌전함"></CatListItem>
                </div>
            </Popup.Default>
        </>
    )
}

function CatListItem(props: {
    cat: string,
    detail: string
}) {
    return (
        <div className="flex items-start justify-between gap-[10px] w-full">
            <div className="bg-pink-0.15 text-pink-200  font-fs-m text-18">{props.cat}</div>
            <div className="text-black-1  font-fs-m text-18">{props.detail}</div>
        </div>
    )
}