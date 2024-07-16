"use client"

import { useEffect } from "react"
import UpdateAge from "../../../../repository/v1.0.0/cat/update_age"
import { useSetRecoilState } from "recoil"
import { CatEvent } from "@/repository/v1.0.0/cat/cat"
import Button from "@/lib/button"
import SignUpPro from "@/repository/v1.0.0/user/sign_up_for_pro"
import { errorPopupState } from "@/recoil/error_popup"
import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup"
import { useLoadingRouter } from "@/hooks/use_loading_router"
import { loadingState } from "@/recoil/loading"

export default function UpdateTime() {
    const update_age = new UpdateAge()
    const sign_up_pro = new SignUpPro()


    const router = useLoadingRouter()
    const setErrorPopup = useSetRecoilState(errorPopupState)
    const raiseErrorPopup = useRaiseErrorPopup()
    const setLoading = useSetRecoilState(loadingState)


    const signUpPro = async () => {
        try {
            setLoading(true);
            const response = await sign_up_pro.sign();
            if (!response.success)
                raiseErrorPopup(response.message);
            else
                setErrorPopup({
                    open: true,
                    title: "성공적으로 신청되었습니다!",
                    children: "프로 계정이 출시되면 가장 빠르게 알려드릴게요."
                });
        } finally {
            setLoading(false);
        }
    }


    const updateTime = async () => {
        const response = await update_age.update();
        if (!response.success)
            raiseErrorPopup(response.message);
        const event = response.data as CatEvent;
        if (event === "disease" || event === "neutering") router(`my-cat/event/${event}`)
        else if (event === "suggest_pro") setErrorPopup({
            open: true,
            title: "고양이와 더 친해지고 싶으신가요?",
            children: <div className="flex flex-col w-full gap-3">
                <ul className="font-fs-r text-14 text-black-1">
                    <li>• 고양이의 성격을 구체화할 수 있어요</li>
                    <li>• 여러 고양이와 함께할 수 있어요</li>
                    <li>• 고양이가 먼저 말을 걸어요</li>
                    <br />
                    <li>• 고양이와 더 오래 시간을 보낼 수 있어요</li>
                    <li>• 집나간 고양이를 찾을 수 있어요</li>
                    <li>• 아픈 고양이를 살릴 수 있어요</li>
                    <br />
                    <li>• 다양한 사료와 장난감을 줄 수 있어요</li>
                    <li>• 놀아주는 방법이 추가돼요(긁어주기, 뽀뽀해주기)</li>
                    <li>• 고양이와 함께하는 이벤트가 추가돼요</li>
                </ul>
                <Button.Default onClick={() => {
                    signUpPro();
                }}>
                    프로 계정 예약하고 할인받기!
                </Button.Default>
            </div>
        })
    }


    useEffect(() => {
        const interval = setInterval(() => {
            updateTime();
        }, 60000);

        return () => clearInterval(interval);
    }, []);


    return <></>
}