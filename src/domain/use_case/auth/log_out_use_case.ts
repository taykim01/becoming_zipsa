import MyResponse from "../MyResponse"

export default class LogOutUseCase {
    async logOut(): Promise<MyResponse> {
        try {
            const res = await fetch(`http://localhost:3000/api/v1/auth/log-out`, {
                method: "POST",
                headers: { "Content-type": "application/json" }
            })
            const responseData = await res.json()
            return new MyResponse(true, "로그아웃에 성공했습니다.", responseData.data)
        } catch (error) {
            return new MyResponse(false, "로그아웃에 실패했습니다.", String(error))
        }
    }
}
