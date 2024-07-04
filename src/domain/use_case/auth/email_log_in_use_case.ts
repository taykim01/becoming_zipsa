import { signInWithEmailAndPassword } from "firebase/auth";
import MyResponse from "../MyResponse"
import { auth } from "@/firebase";
import myUrl from "@/domain/my_url";

export default class EmailLogInUseCase {
    async logIn(
        email: string,
        password: string
    ): Promise<MyResponse> {
        try {
            const res = await fetch(`${myUrl}/api/v1/user/read/query/email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            const data = await res.json()
            if(data.data === "no_user_with_email") return new MyResponse(false, "해당 이메일의 계정 정보가 없습니다.", null)

            const response = await signInWithEmailAndPassword(auth, email, password)
            const uid = response.user.uid

            sessionStorage.setItem('uid', uid);
            return new MyResponse(true, "인증에 성공했습니다.", response.user)
        } catch (error) {
            const errMsg = String(error)
            if(errMsg.includes("wrong-password")) return new MyResponse(false, "비밀번호가 틀렸습니다.", null)
            return new MyResponse(false, "인증에 실패했습니다.", String(error))
        }
    }
}
