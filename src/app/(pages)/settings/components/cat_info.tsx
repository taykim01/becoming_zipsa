import InfoDetails from "./info_details";
import SettingsConatiner from "./settings_container";



export default function CatInfo() {
    
    return (
        <>
        <SettingsConatiner title={"내 고양이"} content={<div className="font-fs-sb text-5 text-pink-500">{"랑기"}</div>} children={
            <div className="flex flex-col justify-between gap-2">
                <InfoDetails title={"성격"} content={"깜냥이"}></InfoDetails>
                <InfoDetails title={"성별"} content={"수컷"}></InfoDetails>
                <InfoDetails title={"챕터"} content={"청소년"}></InfoDetails>
            </div>
        }>
        </SettingsConatiner>
        </>
    )
}