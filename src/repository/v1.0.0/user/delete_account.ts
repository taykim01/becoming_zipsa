import { auth } from "@/firebase";
import RepositoryResponse from "@/repository/repository_response";
import { deleteUser } from "firebase/auth";
import { Cat } from "../cat/cat";
import URL from "@/repository/url";


export default class DeleteAccount {
    async delete(): Promise<RepositoryResponse> {
        try {
            const user = auth.currentUser
            if (!user) return new RepositoryResponse(false, "로그인이 되어있지 않습니다.")
            const user_id = user.uid


            const catDataJson = localStorage.getItem("catData")
            if (!catDataJson) return new RepositoryResponse(false, "고양이 정보가 없습니다.")
            const catData = JSON.parse(catDataJson) as Cat
            const cat_id = catData.id


            const deleteUserRes = await fetch(`${URL}/api/v1.0.0/user/delete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id })
            })
            const deleteUserData = await deleteUserRes.json()
            if (!deleteUserData.success) return new RepositoryResponse(false, "정보 삭제에 실패했습니다.")


            const deleteCatRes = await fetch(`${URL}/api/v1.0.0/cat/delete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cat_id })
            })
            const deleteCatData = await deleteCatRes.json()
            if (!deleteCatData.success) return new RepositoryResponse(false, "고양이 데이터 삭제에 실패했습니다.")


            localStorage.clear()
            await deleteUser(user)


            return new RepositoryResponse(true, "계정 삭제에 성공했습니다.")
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}