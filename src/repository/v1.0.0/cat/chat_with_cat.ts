import RepositoryResponse from "@/repository/repository_response"
import URL from "@/repository/url"
import { Cat, CatChapter, CatChat } from "./cat"

export default class ChatWithCat {
    private chatPolarityMessage(catChat: string) {
        return [
            {
                role: "system",
                content: `
                    Your role is to tell if a response from a cat is positive or negative.
                    Return "positive" only, without any other text, if the response is positive and "negative", without any other text, if response is negative.
                `
            },
            {
                role: "user",
                content: `The reponse is as follows: ${catChat}.`
            }
        ]
    }

    private async readCat(): Promise<RepositoryResponse> {
        try {
            const user_id = localStorage.getItem('id')
            if (!user_id) return new RepositoryResponse(false, "로그인이 필요합니다.")


            const userDataRes = await fetch(`${URL}/api/v1.0.0/user/read`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    user_id
                })
            })
            const userData = await userDataRes.json()
            if (!userData.success) return new RepositoryResponse(false, "유저 정보를 불러오는데 실패했습니다.", userData)


            const cat_id = userData.data.cats[0]
            const catDataRes = await fetch(`${URL}/api/v1.0.0/cat/read`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    cat_id
                })
            })
            const catData = await catDataRes.json()
            if (!catData.success) return new RepositoryResponse(false, "고양이 정보를 불러오는데 실패했습니다.", catData)

            return new RepositoryResponse(true, "채팅을 불러왔습니다.", catData.data)
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }

    }

    private async generateCatResponse(chatToCat: string, catData: Cat): Promise<RepositoryResponse> {
        try {
            const name = catData.name
            const chatData = catData.chats.slice(0, 20)

            const personality = {
                "치즈냥이": "Your color is yellow and white (치즈냥이), You are charming and active.",
                "깜냥이": "Your color is black (깜냥이), You are clever and calm.",
                "흰냥이": "Your color is white (흰냥이), You are shy, sensitive and timid"
            }


            const age: Record<CatChapter, string> = {
                "첫 만남": "",
                "아기 고양이": "You are a Kitten. You are highly curious about the world and eager to explore new things.",
                "청소년 고양이": "You are a Adolscent cat. You become more independent and can manage well on it own.",
                "어른 고양이": "You are a Adult cat. You show affection in various ways and form deeper bonds with its owner.",
                "나이든 고양이": "You are a Aged cat. You prefer comfortable spots and spend more time resting and sleeping. It would be nice if the elderly cat complains to the owner like an old-timer, saying things like 'Back in my day, cats these days...’",
                "고양이 별": ""
            }

            const messages: any[] = [
                {
                    role: "system", content: `
                [roles]: You are going to be a cat, talk with user, being sent by user needs. Talk in Korean
                [goal]: 'You should reflect an attitude of following and respecting the user, as they are your owner.' When you call user, you should call the user as '집사'. Input data would contain the cat's species and age.
                [Name]: Your name is ${name}
                [Character] ${personality[catData.color]}
                You should answer with 'appropriate emojis or actions', to show you are a cat.
                Age is distributed to 4 stages - kitten, adolescent, adult, aged cat.
                [Character with Age]: ${age[catData.chapter]}
                Talk down.  
                `
                },
                ...chatData,
                { role: "user", content: chatToCat }
            ]

            const res = await fetch(`${URL}/api/v1.0.0/llm`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    messages
                })
            })
            const data = await res.json()
            if (!data.success) return new RepositoryResponse(false, "고양이 대답 생성에 실패했습니다.", data)

            return new RepositoryResponse(true, "고양이 대답 생성에 성공했습니다.", data.data)
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }

    private async updateChatData(chatToCat: string, catChat: string, cat_id:string): Promise<RepositoryResponse> {
        try {
            const updateUserChatRes = await fetch(`${URL}/api/v1.0.0/cat/update/chat`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    who: "user",
                    chat: chatToCat,
                    cat_id
                })
            })
            const updateUserChat = await updateUserChatRes.json()
            if(!updateUserChat.success) return new RepositoryResponse(false, "유저 채팅 데이터 저장에 실패했습니다.", {})

            
            const updateCatChatRes = await fetch(`${URL}/api/v1.0.0/cat/update/chat`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    who: "cat",
                    chat: catChat,
                    cat_id
                })
            })
            const updateCatChat = await updateCatChatRes.json()
            if (!updateCatChat.success) return new RepositoryResponse(false, "채팅 데이터 저장에 실패했습니다.", {})

            return new RepositoryResponse(true, "채팅 데이터 저장에 성공했습니다.", {})
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }

    private async checkCatPolarity(catChat: string): Promise<RepositoryResponse> {
        try {
            const polarity = this.chatPolarityMessage(catChat)
            const catChatPolarityRes = await fetch(`${URL}/api/v1.0.0/llm`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    messages: polarity
                })
            })
            const catChatPolarityData = await catChatPolarityRes.json()
            if (!catChatPolarityData.success) return new RepositoryResponse(false, "고양이 대답 감정 분석에 실패했습니다.", {})
            const responsePolarity = catChatPolarityData.data

            return new RepositoryResponse(true, "고양이 대답 감정 분석에 성공했습니다.", responsePolarity)
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }

    async chat(
        chatToCat: string
    ): Promise<RepositoryResponse> {
        try {
            const readCatRes = await this.readCat()
            if (!readCatRes.success) return readCatRes


            const catData = readCatRes.data as Cat
            const totalChat = catData.chats as CatChat[]
            const cat_id = catData.id
            if(!cat_id) return new RepositoryResponse(false, "고양이 ID가 없습니다.")


            totalChat.unshift({ role: "user", content: chatToCat })


            const catChatRes = await this.generateCatResponse(chatToCat, catData)
            if (!catChatRes.success) return catChatRes
            const catChat = catChatRes.data

            
            totalChat.unshift({ role: "cat", content: catChat })
            catData.chats = totalChat
            localStorage.setItem('catData', JSON.stringify(catData))


            const updateChatRes = await this.updateChatData(chatToCat, catChat, cat_id)
            if (!updateChatRes.success) return new RepositoryResponse(false, "채팅 데이터 저장에 실패했습니다.", {})


            const catChatPolarityRes = await this.checkCatPolarity(catChat)
            if (!catChatPolarityRes.success) return catChatPolarityRes
            const responsePolarity = catChatPolarityRes.data


            return new RepositoryResponse(true, "채팅에 성공했습니다.", { catChat, responsePolarity })
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}