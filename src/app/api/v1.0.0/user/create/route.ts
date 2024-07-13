import { db, userDoc } from "@/firebase";
import { User } from "@/repository/v1.0.0/user/user";
import { collection, doc, setDoc } from "firebase/firestore"

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            userData,
            user_id
        } = await request.json() as {
            userData: User,
            user_id: string
        }

        const userRef = userDoc(user_id)
        
        await setDoc(
            userRef, userData
        )
        return new Response(
            JSON.stringify({
                success: true,
                message: "유저 생성 성공",
                data: {}
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "유저 생성 실패",
                data: String(error)
            })
        )
    }
}