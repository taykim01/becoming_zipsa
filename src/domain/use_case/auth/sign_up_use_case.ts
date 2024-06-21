import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import MyResponse from "../MyResponse"
import { auth, provider } from "@/firebase"

export default class SignUpUseCase {
    // sign-up api 호출
    async signUp(): Promise<MyResponse> {
        try {
            const response = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(response);
            if (!credential) return new MyResponse(true, "이미 인증된 사용자", response.user)
            return new MyResponse(true, "인증에 성공했습니다.", response.user)
        } catch (error) {
            return new MyResponse(false, "인증에 실패했습니다.", String(error))
        }
    }

    // user 정보를 db에 저장
    async createUser(): Promise<MyResponse> {
        try {


            return new MyResponse(true, "유저 데이터 생성에 성공했습니다.", {})
        } catch (error) {
            return new MyResponse(false, "유저 데이터 생성에 실패했습니다.", String(error))
        }
    }
}
