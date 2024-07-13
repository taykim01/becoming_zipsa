
import { catDoc } from "@/firebase";
import { Cat } from "@/repository/v1.0.0/cat/cat";
import { getDoc } from "firebase/firestore";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            cat_id
        } = await request.json() as {
            cat_id: string
        }
        const catRef = catDoc(cat_id)
        const docRef = await getDoc(catRef)
        const catData = {
            ...docRef.data(),
            id: docRef.id
        } as Cat

        if (!docRef.exists()) return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 읽기 실패",
                data: "no_cat"
            })
        )
        return new Response(
            JSON.stringify({
                success: true,
                message: "고양이 읽기 성공",
                data: catData
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 읽기 실패",
                data: String(error)
            })
        )
    }
}