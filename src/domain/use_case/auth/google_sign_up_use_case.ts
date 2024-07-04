import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import MyResponse from "../MyResponse"
import { auth, provider } from "@/firebase"
import myUrl from "@/domain/my_url";

export default class GoogleSignUpUseCase {
    async verifyInput(
        name: string
    ): Promise<MyResponse> {
        try {
            //name 빈 string 아닌지 확인
            if (name === "") return new MyResponse(false, "이름을 입력해주세요", {})

            return new MyResponse(true, "인증에 성공했습니다.", {})
        } catch (error) {
            return new MyResponse(false, "인증에 실패했습니다.", String(error))
        }
    }

    private userID: string = ""
    private email: string = ""

    async signUp(): Promise<MyResponse> {
        try {
            const response = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(response);
            if (!credential) return new MyResponse(true, "이미 인증된 사용자", response.user)
            
            if(!response.user.email) return  new MyResponse(false, "이메일이 없습니다.", {})

            sessionStorage.setItem('uid', response.user.uid);
            sessionStorage.setItem('email', response.user.email)
            return new MyResponse(true, "인증에 성공했습니다.", this.userID)
        } catch (error) {
            return new MyResponse(false, "인증에 실패했습니다.", String(error))
        }
    }

    async createUser(name: string): Promise<MyResponse> {
        try {
            const uid = sessionStorage.getItem('uid')
            const email = sessionStorage.getItem('email')
            if(!uid || !email) return new MyResponse(false, "이메일 혹은 아이디가 없습니다.", {})
            const userData: UserModel = {
                id: uid,
                email: email,
                name: name,
            }
            const res = await fetch(`${myUrl}/api/v1/user/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userData})
            })
            const data = await res.json()
            if (!data.success) return new MyResponse(false, "유저 데이터 생성에 실패했습니다.1", {})
            return new MyResponse(true, "유저 데이터 생성에 성공했습니다.", data.data)
        } catch (error) {
            return new MyResponse(false, "유저 데이터 생성에 실패했습니다.2", String(error))
        }
    }
}
