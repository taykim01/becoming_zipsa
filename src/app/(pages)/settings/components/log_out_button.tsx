"use client"

import Button from "../../../../lib/button";
import { useEffect, useState } from "react";
import SettingsConatiner from "./settings_container";
import React from "react";
import ReadUser from "../../../../repository/v1.0.0/user/read_user";
import User from "../../../../repository/v1.0.0/user/user";
import LogOut from "../../../../repository/v1.0.0/user/log_out";
import DeleteAccount from "../../../../repository/v1.0.0/user/delete_account";
import Popup from "../../../../lib/popup";
import ReadCat from "../../../../repository/v1.0.0/cat/read_cat";
import { Cat } from "../../../../repository/v1.0.0/cat/cat";
import { useRaiseErrorPopup } from "@/hooks/use_raise_error_popup";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/recoil/loading";
import { useLoadingRouter } from "@/hooks/use_loading_router";


export default function LogOutButton() {
    const read_user = new ReadUser()
    const log_out = new LogOut()
    const delete_account = new DeleteAccount()
    const read_cat = new ReadCat()


    const router = useLoadingRouter()
    const [userData, setUserData] = useState({} as User)
    const [catData, setCatData] = useState({} as Cat)
    const [popup, setPopup] = useState({
        open: false,
        title: "",
        content: "" as string | null,
        children: ""
    })
    const raiseErrorPopup = useRaiseErrorPopup()
    const setLoading = useSetRecoilState(loadingState)


    const getUserData = async () => {
        const response = await read_user.read()
        if (!response.success) {
            raiseErrorPopup(response.message)
            return
        }
        setUserData(response.data)
    }
    const getCatData = async () => {
        const response = await read_cat.read()
        if (!response.success) {
            raiseErrorPopup(response.message)
            return
        }
        setCatData(response.data)
    }


    useEffect(() => {
        getUserData()
        getCatData()
    }, [])


    const logOut = async () => {
        setLoading(true)
        const response = await log_out.logOut()
        if (!response.success) {
            raiseErrorPopup(response.message)
            return
        }
        localStorage.clear()
        router('/log-in')
        setLoading(false)
    }

    const deleteAccount = async () => {
        setLoading(true)
        const response = await delete_account.delete()
        if (!response.success) {
            raiseErrorPopup(response.message)
            return
        }
        localStorage.clear()
        router('/log-in')
        setLoading(false)
    }


    const openLogOutPopup = () => {
        setPopup({
            open: true,
            content: null,
            title: "로그아웃하기",
            children: "로그아웃"
        })
    }


    const openDeleteAccontPopup = () => {
        setPopup({
            open: true,
            content: `계정을 삭제하면 더 이상 ${catData.name}를 볼 수 없어요ㅠㅠ`,
            title: "계정 탈퇴하기",
            children: "계정 탈퇴"
        })
    }


    return (
        <>
            <SettingsConatiner title="계정" content={userData.email}>
                <div className="flex flex-col gap-2">
                    <Button.SmallDefault onClick={openLogOutPopup}>
                        로그아웃
                    </Button.SmallDefault>
                    <Button.SmallDefault onClick={openDeleteAccontPopup}>
                        탈퇴
                    </Button.SmallDefault>
                </div>
            </SettingsConatiner>

            <Popup.Default open={popup.open} onClose={() => setPopup({ ...popup, open: false })} title={popup.title}>
                <div className="flex flex-col gap-5">
                    {popup.content}
                    <Button.Default onClick={() => {
                        setPopup({ ...popup, open: false });
                        popup.children === "계정 탈퇴" ? deleteAccount() : logOut()
                    }}>{popup.children}</Button.Default>
                </div>
            </Popup.Default>
        </>
    )
}