import { auth } from "@/firebase";
import RepositoryResponse from "@/repository/repository_response";
import { deleteUser } from "firebase/auth";

export default class DeleteAccount {
    async delete():Promise<RepositoryResponse>{
        try {
            const user = auth.currentUser
            if(!user) return new RepositoryResponse(false, "로그인이 되어있지 않습니다.")
            await deleteUser(user)
            return new RepositoryResponse(true, "계정 삭제에 성공했습니다.")
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}