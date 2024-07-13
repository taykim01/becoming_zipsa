import { db, userDoc } from "@/firebase"
import { User } from "@/repository/v1.0.0/user/user"
import { doc, getDoc } from "firebase/firestore"

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            user_id
        } = await request.json() as {
            user_id: string
        }

        const userRef = userDoc(user_id)
        const docSnap = await getDoc(userRef)
        const userData = {
            ...docSnap.data(),
            id: docSnap.id
        } as User
        
        return new Response(
            JSON.stringify({
                success: true,
                message: "유저 불러오기 성공",
                data: userData
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "유저 불러오기 실패",
                data: String(error)
            })
        )
    }
}