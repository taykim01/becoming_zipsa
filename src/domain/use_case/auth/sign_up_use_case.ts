import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import MyResponse from "../MyResponse"
import { auth, provider } from "@/firebase"

export default class SignUpUseCase {
    async signUp(): Promise<MyResponse> {
        try {
            const response = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(response);
            if (!credential) return new MyResponse(true, "이미 인증된 사용자", response.user)
            const uid = response.user.uid
            sessionStorage.setItem('uid', JSON.stringify(uid));
            return new MyResponse(true, "인증에 성공했습니다.", response.user)
        } catch (error) {
            return new MyResponse(false, "인증에 실패했습니다.", String(error))
        }
    }

    async createUser(userData: User): Promise<MyResponse> {
        try {
            const res = await fetch(`https://localhost/api/v1/user/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            const data = await res.json()
            if (!data.success) return new MyResponse(false, "유저 데이터 생성에 실패했습니다.", {})
            return new MyResponse(true, "유저 데이터 생성에 성공했습니다.", data.data)
        } catch (error) {
            return new MyResponse(false, "유저 데이터 생성에 실패했습니다.", String(error))
        }
    }
}
