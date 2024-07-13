import { userCollection } from "@/firebase"
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            user_id,
            cat_id
        } = await request.json() as {
            user_id: string;
            cat_id: string
        }
        const userRef = doc(userCollection, user_id)
        await updateDoc(
            userRef, {
                cats: arrayUnion(cat_id)
            }
        )
        return new Response(
            JSON.stringify({
                success: true,
                message: "유저에 고양이 등록 성공",
                data: {}
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "유저에 고양이 등록 실패",
                data: {}
            })
        )
    }
}