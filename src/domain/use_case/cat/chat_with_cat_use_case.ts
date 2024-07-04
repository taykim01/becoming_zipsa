import { Chat } from "@/app/(pages)/my-cat/components/interaction_group"
import MyResponse from "../MyResponse"
import myUrl from "@/domain/my_url"

export default class ChatWithCatUseCase {
    async chat(
        chatToCat: string,
        catName: string,
        catChapter: CatChapter,
        sex: "수컷" | "암컷",
        chat: Chat[]
    ): Promise<MyResponse> {
        try {
            const res = await fetch(`${myUrl}/api/v1/cat/llm/chat`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    chatToCat,
                    catName,
                    catChapter,
                    sex,
                    chat
                })
            })
            const data = await res.json()
            if(!data.success) return new MyResponse(false, "채팅에 실패했습니다.", {})

            const userID = sessionStorage.getItem('uid')
            const userChatRes = await fetch(`${myUrl}/api/v1/cat/chat/create`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    who: "user",
                    chat: chatToCat,
                    userID
                })
            })
            const userChatData = await userChatRes.json()
            if (!userChatData.success) return new MyResponse(false, "유저 채팅 데이터 저장에 실패했습니다.", {})

            const catChat = data.data
            const catChatRes = await fetch(`${myUrl}/api/v1/cat/chat/create`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    who: "cat",
                    chat: catChat,
                    userID
                })
            })
            const catChatData = await catChatRes.json()
            if (!catChatData.success) return new MyResponse(false, "고양이 채팅 데이터 저장에 실패했습니다.", {})
            return new MyResponse(true, "채팅에 성공했습니다.", catChat)
        } catch (error) {
            return new MyResponse(false, "채팅에 실패했습니다.", String(error))
        }
    }
}