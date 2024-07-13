import { auth } from "@/firebase";
import RepositoryResponse from "@/repository/repository_response";
import { signOut } from "firebase/auth";

export default class LogOutUseCase {
    async logOut(): Promise<RepositoryResponse> {
        try {
            await signOut(auth)
            sessionStorage.removeItem('id');
            return new RepositoryResponse(true, "로그아웃에 성공했습니다.", {})
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}
