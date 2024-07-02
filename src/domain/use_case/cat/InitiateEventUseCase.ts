import MyResponse from "../MyResponse"


export default class InitiateEventUseCase {

    private events = {
        adolescence:"ntr",
        oldCat : "disease"
    }
    async initiate(chapter:"adolescence"|"oldCat" ): Promise<MyResponse> {
        try {
            //chapter의 해당하는 이벤트 있으면 반환해주기
            const returnEvent = this.events[chapter]
            return new MyResponse(true, "이벤트 실행에 성공했습니다.", returnEvent)
        } catch (error) {
            return new MyResponse(false, "이벤트 실행에 실패했습니다.", String(error))
        }
    }
}