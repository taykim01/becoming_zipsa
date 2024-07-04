import MyResponse from "../MyResponse"

export default class CheckSessionTimeUseCase {
    async start():Promise<MyResponse>{
        try {
            sessionStorage.setItem('sessionTime', String(new Date().getTime()))
            return new MyResponse(true, "세션 시간을 시작했습니다.", {})
        } catch (error) {
            return new MyResponse(false, "세션 시간을 시작하지 못했습니다.", String(error))
        }
    }

    async check():Promise<MyResponse>{
        try {
            const sessionTime = sessionStorage.get('sessionTime')
            return new MyResponse(true, "세션 시간을 불러왔습니다.", sessionTime)
        } catch (error) {
            return new MyResponse(false, "세션 시간을 불러오지 못했습니다.", String(error))
        }
    }
}