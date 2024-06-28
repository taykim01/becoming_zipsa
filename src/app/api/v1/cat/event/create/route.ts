import { db } from "@/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore"


export async function POST(request: Request): Promise<Response> {
    try {
        const {userID, catID} = await request.json() as {userID:string; catID:string}
        const catRef = doc(collection(db, "user", userID, "cat",catID))

        const docSnap = await getDoc(catRef);
        const cat = {...docSnap.data(),id:docSnap.id}
        
        return new Response(
            JSON.stringify({
                success: true,
                message: "고양이 데이터 불러오기 성공",
                data: cat,
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 데이터 불러오기 실패",
                data: {}
            })
        )
    }
}