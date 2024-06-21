import MyResponse from "../MyResponse"

export default class SignUpUseCase {
    // sign-up api 호출
    async signUp(): Promise<MyResponse> {
        try {
            const res = await fetch(`http://localhost:3000/api/v1/auth/authenticate`, {
                method: "POST",
                headers: { "Content-type": "application/json" }
            })
            const responseData = await res.json()
            console.log(responseData)
            return new MyResponse(true, "로그인에 성공했습니다.", responseData.data)
        } catch (error) {
            return new MyResponse(false, "로그인에 실패했습니다.", String(error))
        }
    }

    // user 정보를 db에 저장
    async createUser(): Promise<MyResponse> {
        try {


            return new MyResponse(true, "유저 데이터 생성에 성공했습니다.", {})
        } catch (error) {
            return new MyResponse(false, "유저 데이터 생성에 실패했습니다.", String(error))
        }
    }
}
