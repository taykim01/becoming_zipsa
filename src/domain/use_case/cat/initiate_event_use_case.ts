import MyResponse from "../MyResponse"

export default class InitiateEventUseCase {

    async initiate(userID:string, catID:string): Promise<MyResponse> {
        try {
            const res = await fetch(`http://localhost:3000/api/v1/cat/event/create`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body : JSON.stringify({
                    userID, catID
                })
            })
            const data = await res.json()
            if (!data.success) return new MyResponse(false, "이벤트 실행에 실패했습니다.", {})
            const catData = data.data
            
            return new MyResponse(true, "이벤트 실행에 성공했습니다.", {})
        } catch (error) {
            return new MyResponse(false, "이벤트 실행에 실패했습니다.", String(error))
        }
    }
}
