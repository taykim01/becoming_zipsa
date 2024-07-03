import MyResponse from "../MyResponse";

export default class CheckAuthSessionUseCase {
    async check():Promise<MyResponse>{
        try {
            const cachedData = sessionStorage.getItem('uid')
            if(!cachedData) return new MyResponse(false, "세션이 없습니다. 1", {})
            return new MyResponse(true, "인증에 성공했습니다.", cachedData)
        } catch (error) {
            return new MyResponse(false, "인증에 실패했습니다.", String(error))
        }
    }
}
