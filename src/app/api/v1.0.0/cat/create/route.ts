import { catCollection } from "@/firebase";
import { Cat } from "@/repository/v1.0.0/cat/cat";
import { doc, setDoc } from "firebase/firestore"

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            catData
        } = await request.json() as {
            catData: Cat
        }
        const catRef = doc(catCollection)
        await setDoc(
            catRef, catData
        )
        return new Response(
            JSON.stringify({
                success: true,
                message: "고양이 생성 성공",
                data: {}
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 생성 실패",
                data: {}
            })
        )
    }
}