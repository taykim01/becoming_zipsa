import { db } from "@/firebase";
import { collection, doc, setDoc } from "firebase/firestore"



export async function POST(request: Request): Promise<Response> {
    try {
        const {userID, catData} = await request.json() as {userID:string; catData:CatModel}
        const catRef = doc(collection(db, "user", userID,"cat"))
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