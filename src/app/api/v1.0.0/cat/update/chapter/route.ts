
import { catDoc } from "@/firebase";
import { updateDoc } from "firebase/firestore";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            cat_id,
            nextChapter,
        } = await request.json() as {
            cat_id: string;
            nextChapter: string;
        };

        const catRef = catDoc(cat_id);
        await updateDoc(catRef, {
            chapter: nextChapter,
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "고양이 챕터 업데이트 성공",
                data: {}
            })
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 챕터 업데이트 실패",
                data: String(error)
            })
        );
    }
}