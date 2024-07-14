"use client"

import Button from "@/lib/button"
import Input from "@/lib/input"
import Popup from "@/lib/popup"
import AdoptCat from "@/repository/v1.0.0/cat/adopt_cat"
import { CatSex, CatType } from "@/repository/v1.0.0/cat/cat"
import { sendGAEvent } from "@next/third-parties/google"
import { useRouter } from "next/navigation"
import { useState } from "react"

type CatData = {
    name: string,
    color: string,
    sex: string,
}

export default function InputCatData() {
    const adopt_cat = new AdoptCat()


    const router = useRouter()
    const [personalityPopup, setPersonalityPopup] = useState<boolean>(false)
    const [catData, setCatData] = useState<CatData>({
        name: "",
        color: "",
        sex: "",
    })
    const [errorPopup, setErrorPopup] = useState({
        open: false,
        title: "",
        children: ""
    })


    const setName = (name: CatData["name"]) => setCatData({ ...catData, name })
    const setColor = (color: CatData["color"]) => setCatData({ ...catData, color })
    const setSex = (sex: CatData["sex"]) => setCatData({ ...catData, sex })


    const adoptCat = async () => {
        const verifyRes = await adopt_cat.verifyInput(
            catData.name,
            catData.color as CatType,
            catData.sex as CatSex
        )
        if (!verifyRes.success) {setErrorPopup({
            open: true,
            title: "오류가 발생했어요",
            children: verifyRes.message
        })
        return 
    }
            
            
        sendGAEvent({ event: 'adopt_cat', value: 'adopt_cat' })
        const response = await adopt_cat.adopt(
            catData.name,
            catData.color as CatType,
            catData.sex as CatSex
        )
        if (!response.success) {
            setErrorPopup({
                open: true,
                title: "오류가 발생했어요.",
                children: response.message
            })
            return
        }
        setErrorPopup({
            open: true,
            title: "알람",
            children: "고양이 입양에 성공했습니다."
        })
        router.push("/my-cat")
    }

    return (
        <>
            <div className="flex flex-col justify-between flex-grow">
                <div className="flex flex-col gap-4 w-full">
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
                        items={["치즈냥이", "흰냥이", "깜냥이"]}
                    />
                    <Input.MultiSelect
                        title="성별"
                        onSelect={setSex}
                        items={["수컷", "암컷"]}
                    />
                </div>
                <Button.Default onClick={adoptCat}>{`${catData.name || "_____"} 입양하기!`}</Button.Default>
            </div>
            <Popup.Default
                title="고양이별 성격 알아보기"
                open={personalityPopup}
                onClose={() => setPersonalityPopup(false)}>
                <div className="flex flex-col gap-5">
                    <CatListItem cat="치즈냥이" detail="활발함,응석받이, 소심"></CatListItem>
                    <CatListItem cat="깜냥이" detail="똑똑함, 얌전함"></CatListItem>
                    <CatListItem cat="흰냥이" detail="수줍음, 겁많음, 섬세함, 느긋함"></CatListItem>
                </div>
            </Popup.Default>
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