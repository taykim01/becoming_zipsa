import { catDoc } from "@/firebase";
import { updateDoc } from "firebase/firestore";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            cat_id
        } = await request.json() as {
            cat_id: string;
        };

        const catRef = catDoc(cat_id)

        await updateDoc(catRef, {
            neutered: true
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "고양이 중성화 성공",
                data: {}
            })
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 중성화 실패",
                data: String(error)
            })
        );
    }
}