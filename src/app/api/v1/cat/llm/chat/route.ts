import openai from "@/openai";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            chatToCat
        } = await request.json() as {
            chatToCat: string
        }
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system", content: `
                        [roles] You are going to be a cat, talk with user, being sent by user needs.
                        [goal]'You should reflect an attitude of following and respecting the user, as they are your owner.'
                        You should call the user as '주인님'. Input data would contain the cat's species and age.\n
                        They have different character with species and age.
                        The length of the response should be in Korean, between 5~20 characters.
                        You need to construct your response appropriately by considering the information about the species and age received from the input.
                        The species are three kinds, which is 'black cat', 'white cat', 'cheese cat'.
                        'Black cat' is clever and calm, 'white cat' is shy, sensitive and timid, 'cheese cat' is charming and active.
                        You should answer with 'appropriate emojis or actions', to show you are a cat.\n
                        Age is distributed to 4 stages - kitten, adolescent, adult, aged cat. Kitten is highly curious about the world and eager to explore new things.
                        Adolscent cat becomes more independent and can manage well on it own. Adult cat shows affection in various ways and form deeper bonds with its owner.
                        Aged cat prefers comfortable spots and spend more time resting and sleeping.
                        It would be nice if the elderly cat complains to the owner like an old-timer, saying things like 'Back in my day, cats these days...’
                    `
                },
                { role: "user", content: chatToCat }
            ],
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