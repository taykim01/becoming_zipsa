
import { deleteDoc } from "firebase/firestore";
import { catDoc } from "../../../../..//firebase";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            cat_id
        } = await request.json() as {
            cat_id: string
        }
        const catRef = catDoc(cat_id)
        await deleteDoc(catRef)

        return new Response(
            JSON.stringify({
                success: true,
                message: "고양이 읽기 성공",
                data: {}
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