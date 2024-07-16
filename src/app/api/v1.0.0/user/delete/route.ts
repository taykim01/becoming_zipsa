
import { deleteDoc } from "firebase/firestore";
import { userDoc } from "../../../../..//firebase";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            user_id
        } = await request.json() as {
            user_id: string
        }
        const userRef = userDoc(user_id)
        await deleteDoc(userRef)

        return new Response(
            JSON.stringify({
                success: true,
                message: "유저 읽기 성공",
                data: {}
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "유저 읽기 실패",
                data: String(error)
            })
        )
    }
}