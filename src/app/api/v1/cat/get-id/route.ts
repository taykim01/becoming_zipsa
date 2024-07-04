import { db } from "@/firebase"
import { collection, getDocs } from "firebase/firestore"

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            userID
        } = await request.json() as {
            userID: string
        }
        const cats: CatModel[] = []
        const catColRef = collection(db, "user", userID, "cat")
        const querySnapshot = await getDocs(catColRef)
        querySnapshot.forEach((doc) => {
            cats.push({
                ...doc.data(),
                id: doc.id
            } as CatModel)
        })

        const catID = cats[0].id
        return new Response(
            JSON.stringify({
                success: true,
                message: "고양이 ID를 찾았습니다.",
                data: catID
            }))
    } catch {
        return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 ID를 찾을 수 없습니다.",
                data: {}
            })
        )
    }
}