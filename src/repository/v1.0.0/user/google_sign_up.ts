import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase"
import RepositoryResponse from "@/repository/repository_response";
import URL from "@/repository/url";
import { User } from "./user";

export default class GoogleSignUp {
    private user_id: string = ""

    async verifyInput(
        name: string
    ): Promise<RepositoryResponse> {
        try {
            if (name === "") return new RepositoryResponse(false, "이름을 입력해주세요", {})

            return new RepositoryResponse(true, "인증에 성공했습니다.", {})
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }

    async signUp(): Promise<RepositoryResponse> {
        try {
            const response = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(response);
            if (!credential) return new RepositoryResponse(true, "이미 인증된 사용자", response.user)
            
            if(!response.user.email) return  new RepositoryResponse(false, "이메일이 없습니다.", {})

            localStorage.setItem('id', response.user.uid);
            localStorage.setItem('email', response.user.email)
            
            return new RepositoryResponse(true, "인증에 성공했습니다.", this.user_id)
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }

    async createUser(name: string): Promise<RepositoryResponse> {
        try {
            const uid = localStorage.getItem('id')
            const email = localStorage.getItem('email')
            if(!uid || !email) return new RepositoryResponse(false, "이메일 혹은 아이디가 없습니다.", {})
            const userData: User = {
                email: email,
                name: name,
                cats: []
            }
            const res = await fetch(`${URL}/api/v1.0.0/user/create`, {
                method: "POST",
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                    userData,
                    user_id: uid
                })
            })
            const data = await res.json()
            if (!data.success) return new RepositoryResponse(false, "유저 데이터 생성에 실패했습니다.", {})
            return new RepositoryResponse(true, "유저 데이터 생성에 성공했습니다.", data.data)
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}
