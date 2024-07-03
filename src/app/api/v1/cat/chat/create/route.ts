import { db } from "@/firebase";
import { arrayUnion, collection, doc, getDocs, updateDoc } from "firebase/firestore";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            who,
            chat,
            userID
        } = await request.json() as {
            who: "user" | "cat",
            chat: string,
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
        if(!catID) return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 ID를 찾을 수 없습니다.",
                data: {}
            })
        )

        const docRef = doc(db, "user", userID, "cat", catID);
        await updateDoc(docRef, {
            catChat: arrayUnion({
                who,
                chat
            })
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "고양이 대화 생성 성공",
                data: {}
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "고양이 대화 생성 실패",
                data: String(error)
            })
        )
    }
}