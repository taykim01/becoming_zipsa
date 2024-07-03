"use client"

import Button from "@/lib/button"
import Input from "@/lib/input"
import Popup from "@/lib/popup"
import { useRouter } from "next/navigation"
import { useState } from "react"

type CatData = {
    name: string,
    type: string,
    sex: string,
}

export default function InputCatData() {
    const router = useRouter()
    const [personalityPopup, setPersonalityPopup] = useState<boolean>(false)
    const [catData, setCatData] = useState<CatData>({
        name: "",
        type: "",
        sex: "",
    })

    const setName = (name: CatData["name"]) => {
        setCatData({ ...catData, name })
    }

    const setType = (type: CatData["type"]) => {
        setCatData({ ...catData, type })
    }

    const setSex = (sex: CatData["sex"]) => {
        setCatData({ ...catData, sex })
    }

    const adoptCat = () => {
        console.log(catData)
        router.push("/my-cat")
    }

    return (
        <>
            <div className="flex flex-col gap-4 w-full">
                <Input.Text
                    title="고양이 이름"
                    onChange={setName}
                    placeholder="불러주고픈 이름이 있나요?"
                    onEnter={adoptCat}
                />
                <Input.MultiSelect
                    title="성격"
                    onSelect={setType}
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
            <div className="absolute bottom-0 w-full">
                <Button.Default onClick={adoptCat}>{`${catData.name || "_____"} 입양하기!`}</Button.Default>
            </div>
            <Popup
                title="고양이별 성격 알아보기"
                open={personalityPopup}
                onClose={() => setPersonalityPopup(false)}>
                
                    <div className="flex flex-col gap-5 p-5 ">
                        <CatListItem cat="치즈냥이" detail="활발함,응성받이, 소심"></CatListItem>
                        <CatListItem cat="깜냥이" detail="똑똑함, 얌전함"></CatListItem>
                        <CatListItem cat="흰냥이" detail="수줍음, 겁많음, 섬세함, 느긋함"></CatListItem>
                    </div>
            </Popup>
        </>
    )
}

function CatListItem(props: {
    cat: string,
    detail: string
}) {
    return (
        <div className="flex items-start justify-between gap-[10px] w-full">
            <div className="bg-pink-15 text-pink-200  font-fs-m text-m18">{props.cat}</div>
            <div className="text-black  font-fs-m text-m18">{props.detail}</div>
        </div>
    )
}