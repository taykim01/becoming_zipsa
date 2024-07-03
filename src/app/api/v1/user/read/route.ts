import { db } from "@/firebase"
import { doc, getDoc } from "firebase/firestore"

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            userID
        } = await request.json() as {
            userID: string
        }

        const docRef = doc(db, "user", userID)
        const docSnap = await getDoc(docRef)
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