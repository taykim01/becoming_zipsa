import RepositoryResponse from "../../repository_response"
import URL from "../../url"

export default class ReadUser {
    async read(): Promise<RepositoryResponse> {
        const user_id = localStorage.getItem('id')
        if (!user_id) return new RepositoryResponse(false, "로그인이 필요합니다.", null)

        try {
            const res = await fetch(`${URL}/api/v1.0.0/user/read`, {
                headers: { "Content-type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                    user_id
                })
            })
            const data = await res.json()
            if (!data.success) return new RepositoryResponse(false, "유저 데이터 조회에 실패했습니다.")

            return new RepositoryResponse(true, "유저 데이터 조회에 성공했습니다.", data.data)
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}