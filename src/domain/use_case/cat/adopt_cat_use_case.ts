import MyResponse from "../MyResponse"

export default class AdoptCatUseCase {
    async verifyInput(): Promise<MyResponse> {
        try {
            
            return new MyResponse(true, "인증에 성공했습니다.", {})
        } catch (error) {
            return new MyResponse(false, "인증에 실패했습니다.", String(error))
        }
    }

    async adopt(userID:string, catData:CatModel): Promise<MyResponse> {
        try {
            const res = await fetch(`http://localhost:3000/api/v1/cat/create`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body : JSON.stringify({
                    userID, catData
                })
            })
            const data = await res.json()
            if (!data.success) return new MyResponse(false, "고양이 데이터 생성에 실패했습니다.", {})
            return new MyResponse(true, "고양이 데이터 생성에 성공했습니다.", {})
        } catch (error) {
            return new MyResponse(false, "고양이 데이터 생성에 실패했습니다.", String(error))
        }
    }
}
