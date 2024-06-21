import { auth } from "@/firebase";
import { signOut } from "firebase/auth"


export async function POST(request: Request): Promise<Response> {
    try {
        await signOut(auth)
        return new Response(
            JSON.stringify({
                success: true,
                message: "로그아웃 성공",
                data: {}
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "로그아웃 실패",
                data: {}
            })
        )
    }
}