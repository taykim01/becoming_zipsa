import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import MyResponse from "../MyResponse"
import { auth, provider } from "@/firebase"

export default class SignUpUseCase {
    async verifyInput(
        email: string,
        password: string,
        passwordCheck: string,
        name: string
    ): Promise<MyResponse> {
        try {
            //이메일 정규식 확인
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) return new MyResponse(false, "이메일 형식에 맞게 써 주세요.", {})

            //패스워드 로직 통과하는지 확인
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            if (passwordRegex.test(password)) return new MyResponse(false, "비밀번호는 알파벳, 특수문자와 숫자를 포함한 6자 이상의 문자로 구성해야 합니다.", {})

            //패스워드 체크가 일치하는지 확인
            if (passwordCheck !== password) return new MyResponse(false, "비밀번호가 일치하지 않습니다.", {})

            //name 빈 string 아닌지 확인
            if (name === "") return new MyResponse(false, "이름을 입력해주세요", {})

            return new MyResponse(true, "인증에 성공했습니다.", {})
        } catch (error) {
            return new MyResponse(false, "인증에 실패했습니다.", String(error))
        }
    }

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

    async createUser(email: string, password: string, name: string): Promise<MyResponse> {
        try {
            const userData: User = {
                email: email,
                password: password,
                name: name,
            }
            const res = await fetch(`http://localhost:3000/api/v1/user/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userData})
            })
            const data = await res.json()
            console.log(data)
            if (!data.success) return new MyResponse(false, "유저 데이터 생성에 실패했습니다.1", {})
            return new MyResponse(true, "유저 데이터 생성에 성공했습니다.", data.data)
        } catch (error) {
            return new MyResponse(false, "유저 데이터 생성에 실패했습니다.2", String(error))
        }
    }
}
