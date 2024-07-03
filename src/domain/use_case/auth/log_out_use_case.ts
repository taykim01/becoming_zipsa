import { signOut } from "firebase/auth";
import MyResponse from "../MyResponse"
import { auth } from "@/firebase";

export default class LogOutUseCase {
    async logOut(): Promise<MyResponse> {
        try {
            await signOut(auth)
            sessionStorage.removeItem('uid');
            return new MyResponse(true, "로그아웃에 성공했습니다.", {})
        } catch (error) {
            return new MyResponse(false, "로그아웃에 실패했습니다.", String(error))
        }
    }
}
