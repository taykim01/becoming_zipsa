import MyResponse from "../MyResponse";
import { getAuth, deleteUser } from "firebase/auth";

export default class DeleteAccountUseCase {
    async deleteAccount(): Promise<MyResponse> {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) return new MyResponse(true, "존재하지 않는 유저", {})
            await deleteUser(user)
            sessionStorage.removeItem('uid');
            return new MyResponse(false, "삭제에 성공했습니다.", {})
        } catch (error) {
            return new MyResponse(false, "삭제에 실패했습니다.", String(error))
        }
    }
}
