import RespositoryResponse from "../../repository_response";
import URL from "../../url"

export default class SignUpPro {
    async sign():Promise<RespositoryResponse> {
        try {
            const user_id = localStorage.getItem('id')
            if (!user_id) return new RespositoryResponse(false, "로그인이 필요합니다.")

            const res = await fetch(`${URL}/api/v1.0.0/sign-up-pro`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user_id
                })
            })
            const data = await res.json()
            if (!data.success) return new RespositoryResponse(false, "신청에 실패했습니다")

            return new RespositoryResponse(true, "성공적으로 신청되었습니다.")
        } catch (error) {
            return new RespositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}