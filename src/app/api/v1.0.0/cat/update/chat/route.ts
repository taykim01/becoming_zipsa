import { catDoc } from "@/firebase";
import { arrayUnion, updateDoc } from "firebase/firestore";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            who,
            chat,
            cat_id
        } = await request.json() as {
            who: "user" | "assistant",
            chat: string,
            cat_id: string
        }
        
        const docRef = catDoc(cat_id);
        await updateDoc(docRef, {
            chats: arrayUnion({
                role: who,
                content: chat
            })
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "고양이 대화 생성 성공",
                data: {}
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 대화 생성 실패",
                data: String(error)
            })
        )
    }
}