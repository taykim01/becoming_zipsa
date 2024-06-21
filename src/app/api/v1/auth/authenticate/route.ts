import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export async function POST(request: Request): Promise<Response> {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);

        // credential이 없는 경우는 로그인 세션이 이미 유효함을 의미할 수 있으므로
        // result.user 정보를 사용하여 성공 응답을 반환
        if (!credential) {
            return new Response(JSON.stringify({
                success: true,
                message: "이미 인증된 사용자",
                data: result.user
            }), { status: 200 });
        }

        // credential이 있는 경우 정상적으로 인증 성공 처리
        return new Response(JSON.stringify({
            success: true,
            message: "인증 성공",
            data: result.user
        }), { status: 200 });

    } catch (error) {
        // 오류 처리
        const errorMessage = (error as Error).message;
        return new Response(JSON.stringify({
            success: false,
            message: errorMessage,
            data: {}
        }), { status: 400 });
    }
}
