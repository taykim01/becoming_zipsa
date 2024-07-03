import { signInWithEmailAndPassword } from "firebase/auth";
import MyResponse from "../MyResponse"
import { auth } from "@/firebase";

export default class EmailLogInUseCase {
    async logIn(
        email: string,
        password: string
    ): Promise<MyResponse> {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            const uid = response.user.uid
            console.log(uid)

            sessionStorage.setItem('uid', uid);
            return new MyResponse(true, "인증에 성공했습니다.", response.user)
        } catch (error) {
            return new MyResponse(false, "인증에 실패했습니다.", String(error))
        }
    }
}
