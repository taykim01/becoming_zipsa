import { proWaitlistCollection } from "../../../../firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            user_id
        } = await request.json() as {
            user_id: string
        }
        const docRef = doc(proWaitlistCollection, user_id)
        await setDoc(docRef, {})

        return new Response(
            JSON.stringify({
                success: true,
                message: "프로 계정 예약 성공",
                data: {}
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "프로 계정 예약 실패",
                data: {}
            })
        )
    }
}