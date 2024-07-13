import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import openai from "../../../../openai"

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            messages
        } = await request.json() as {
            messages: ChatCompletionMessageParam[]
        }

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