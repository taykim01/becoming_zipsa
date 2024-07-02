import MyResponse from "../MyResponse"

export default class ChatWithCatUseCase {
    async chat(chatToCat: string): Promise<MyResponse> {
        try {
            const res = await fetch(`http://localhost:3000/api/v1/cat/llm/chat`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    chatToCat
                })
            })
            const data = await res.json()
            const userChatRes = await fetch(`http://localhost:3000/api/v1/cat/chat/create`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    created_at: new Date(),
                    who: "user",
                    chat: chatToCat
                })
            })
            const userChatData = await userChatRes.json()
            if(!userChatData.success) return new MyResponse(false, "유저 채팅 데이터 저장에 실패했습니다.", {})
            const catChatRes = await fetch(`http://localhost:3000/api/v1/cat/chat/create`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    created_at: new Date(),
                    who: "",
                    chat: data.data
                })
            })
            const catChatData = await catChatRes.json()
            if(!catChatData.success) return new MyResponse(false, "고양이 채팅 데이터 저장에 실패했습니다.", {})
            return new MyResponse(true, "채팅에 성공했습니다.", data.data)
        } catch (error) {
            return new MyResponse(false, "채팅에 실패했습니다.", String(error))
        }
    }
}