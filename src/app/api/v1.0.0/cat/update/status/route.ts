import { catDoc } from "@/firebase";
import { updateDoc } from "firebase/firestore";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            cat_id,
            update_data
        } = await request.json() as {
            cat_id: string;
            update_data: {
                hunger: number;
                affection: number;
                health: number;
            }
        };

        const catRef = catDoc(cat_id);

        await updateDoc(catRef, update_data);

        return new Response(
            JSON.stringify({
                success: true,
                message: "고양이 상태 업데이트 성공",
                data: {}
            })
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 상태 업데이트 실패",
                data: String(error)
            })
        );
    }
}