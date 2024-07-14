"use client"


import { loadingState } from "@/recoil/loading"
import { Cat } from "@/repository/v1.0.0/cat/cat"
import ReadCat from "@/repository/v1.0.0/cat/read_cat"
import UpdateAge from "@/repository/v1.0.0/cat/update_age"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"


function SexSymbol(props: { sex: "수컷" | "암컷" }) {
    if (props.sex === "수컷") {
        return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
            <path d="M9.53035 8.96973C8.06588 7.50527 5.6915 7.50528 4.22705 8.96973C2.76259 10.4342 2.76258 12.8086 4.22705 14.273C5.6915 15.7375 8.06589 15.7375 9.53035 14.273C10.9948 12.8086 10.9948 10.4342 9.53035 8.96973ZM9.53035 8.96973L13.773 4.72709M13.773 4.72709V8.96973M13.773 4.72709H9.53035" stroke="#7E7E7E" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    } else return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
        <path d="M6.75 14H11.25M9 10.25V16.25M9 10.25C11.071 10.25 12.75 8.57105 12.75 6.5C12.75 4.42893 11.071 2.75 9 2.75C6.92893 2.75 5.25 4.42893 5.25 6.5C5.25 8.57105 6.92893 10.25 9 10.25Z" stroke="#7E7E7E" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}


export default function CatInfo() {
    const read_cat = new ReadCat()
    const update_age = new UpdateAge()

    const router = useRouter()
    const setLoading = useSetRecoilState(loadingState)
    const [catData, setCatData] = useState({} as Cat)


    const readCatData = async (isInitialLoad = false) => {
        if (isInitialLoad) setLoading(true);
        const response = await read_cat.read(true);
        if (!response.success) {
            alert(response.message);
            if (isInitialLoad) setLoading(false);
            return;
        }
        setCatData(response.data);
        if (isInitialLoad) setLoading(false);
    }


    const updateTime = async () => {
        const response = await update_age.update();
        console.log(response)
        if (!response.success) alert(response.message);
        
        const event = response.data;
        if (typeof event === "string") router.push(`my-cat/event/${event}`)
    }


    useEffect(() => {
        readCatData(true);
        const interval = setInterval(() => {
            updateTime();
        }, 60000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="flex gap-3 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                    <path d="M5.66587 18.3104C7.22455 19.1072 8.97373 19.5227 10.7229 19.5573C10.8095 19.5573 10.9134 19.5573 11 19.5573C12.7665 19.5573 14.5157 19.1763 16.109 18.4143C17.5636 17.7216 18.88 16.6824 19.85 15.3835C20.9582 13.894 21.5298 12.1103 21.5298 10.2571C21.5298 9.07939 21.5298 7.91904 21.5298 6.74137C21.5298 5.45979 21.5298 4.19553 21.5298 2.91395C21.5298 2.46366 21.5298 2.01338 21.5298 1.58041C21.5298 0.766436 20.716 0.229558 19.9711 0.523975L16.0224 2.16925C15.7626 2.27316 15.4682 2.29048 15.2084 2.18656C13.9269 1.68432 12.5067 1.42454 11 1.42454C9.49329 1.42454 8.07316 1.70164 6.79158 2.18656C6.5318 2.29048 6.23739 2.27316 5.97761 2.16925L2.02895 0.576104C1.28425 0.264368 0.470276 0.818565 0.470276 1.63254C0.470276 2.23869 0.470276 2.86217 0.470276 3.46832C0.470276 4.73258 0.470276 5.99684 0.470276 7.27842C0.470276 8.35218 0.470276 9.40861 0.470276 10.4824C0.470276 12.1969 1.02447 13.8595 2.01164 15.245C2.94684 16.5439 4.22842 17.583 5.66587 18.3104ZM14.8448 10.2919C15.7973 10.2919 16.5766 11.0712 16.5766 12.0237C16.5766 12.9763 15.7973 13.7556 14.8448 13.7556C13.8922 13.7556 13.1129 12.9763 13.1129 12.0237C13.1129 11.0541 13.8922 10.2919 14.8448 10.2919ZM7.15527 10.2919C8.1078 10.2919 8.88714 11.0712 8.88714 12.0237C8.88714 12.9763 8.1078 13.7556 7.15527 13.7556C6.20275 13.7556 5.42341 12.9763 5.42341 12.0237C5.42341 11.0541 6.20275 10.2919 7.15527 10.2919Z" fill="black" />
                </svg>
                <div className="font-ohsquare text-r20 text-black">{catData.name}</div>
            </div>
            <div className="flex gap-2 items-center font-fs-r text-r14 text-gray-light">
                <div className="flex items-center">
                    <SexSymbol sex={catData.sex} />
                    <div>{catData.sex}</div>
                </div>
                <div>•</div>
                <div>{catData.chapter}</div>
            </div>
        </div>
    )
}