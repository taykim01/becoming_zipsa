import { Chat } from "@/app/(pages)/my-cat/components/interaction_group";
import openai from "@/openai";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            chatToCat,
            catName,
            catChapter,
            sex,
            chat
        } = await request.json() as {
            chatToCat: string,
            catName: string,
            catChapter: CatChapter,
            sex: "수컷" | "암컷",
            chat: Chat[]
        }

        const chatData = chat.map((c) => {
            if (c.who === "user") return {
                role: c.who,
                content: c.chat
            }
            else return {
                role: "assistant",
                content: c.chat,
            }
        })

        const messages: any[] = [
            {
                role: "system", content: `
                    [roles] You are going to be a cat, talk with user, being sent by user needs.
                    [goal]'You should reflect an attitude of following and respecting the user, as they are your owner.'
                    You should call the user as '집사야'. Input data would contain the cat's species and age.\n
                    They have different character with species and age.
                    The length of the response should be in Korean, between 5~20 characters.
                    It would be nice if the elderly cat complains to the owner like an old-timer, saying things like 'Back in my day, cats these days...’
                    반드시 반말을 써.
                    For reference, your name is ${catName}, so response when you are called by ${catName}. you are a ${catChapter}, your sex is ${sex}.
                `
            },
            ...chatData,
            { role: "user", content: chatToCat }
        ]

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-4o",
        });
        const response = completion.choices[0].message.content;
        return new Response(
            JSON.stringify({
                success: true,
                message: "답변 생성 성공",
                data: response
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "답변 생성 실패",
                data: String(error)
            })
        )
    }
}