import { db, userCollection } from "@/firebase"
import { User } from "@/repository/v1.0.0/user/user"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            email
        } = await request.json() as {
            email: string
        }
        const users: User[] = []

        const queryResult = query(userCollection, where("email", "==", email))
        const querySnapshot = await getDocs(queryResult)

        querySnapshot.forEach((doc) => {
            users.unshift({
                ...doc.data(),
                id: doc.id,
            } as User)
        })

        if (users.length === 0) return new Response(
            JSON.stringify({
                success: false,
                message: "유저가 존재하지 않습니다.",
                data: "no_user_with_email"
            })
        )

        return new Response(
            JSON.stringify({
                success: true,
                message: "유저 불러오기 성공",
                data: users
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