import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import MyResponse from "../MyResponse"
import { auth, provider } from "@/firebase"

export default class ActionsToCatUseCase {

    async applyAction(): Promise<MyResponse> {
        try {
            
            return new MyResponse(true, "인증에 성공했습니다.", response.user)
        } catch (error) {
            return new MyResponse(false, "인증에 실패했습니다.", String(error))
        }
    }

}
