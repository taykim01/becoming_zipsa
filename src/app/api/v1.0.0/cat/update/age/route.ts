import { catDoc, db } from "../../../../../../firebase";
import { doc, increment, updateDoc } from "firebase/firestore";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            cat_id,
            newCatAge
        } = await request.json() as {
            cat_id: string;
            newCatAge: number;
        };

        const catRef = catDoc(cat_id)

        await updateDoc(catRef, {
            age: newCatAge
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "고양이 나이 업데이트 성공",
                data: {}
            })
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 나이 업데이트 실패",
                data: String(error)
            })
        );
    }
}