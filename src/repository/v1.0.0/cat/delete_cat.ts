import RepositoryResponse from "../../repository_response";

export default class DeleteCat {
    async delete(): Promise<RepositoryResponse> {
        try {
            const cat = localStorage.getItem("catData")
            if (!cat) return new RepositoryResponse(false, "고양이 정보가 없습니다.")
            const catData = JSON.parse(cat)
            const cat_id = catData.id


            const user_id = localStorage.getItem("id")
            if (!user_id) return new RepositoryResponse(false, "로그인이 필요합니다.")



            const response = await fetch("/api/v1.0.0/cat/delete", {
                method: "POST",
                body: JSON.stringify({
                    cat_id
                })
            })
            const result = await response.json()
            if (!result.success) return new RepositoryResponse(false, "고양이 삭제에 실패했습니다.", result.data)


            const removeCatRes = await fetch("/api/v1.0.0/user/update/remove-cat", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    user_id,
                    cat_id
                })
            })
            const removeCatData = await removeCatRes.json()
            if (!removeCatData.success) return new RepositoryResponse(false, "고양이 삭제에 실패했습니다.", removeCatData.data)


            localStorage.removeItem("catData")


            return new RepositoryResponse(true, "고양이 삭제에 성공했습니다.")
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}