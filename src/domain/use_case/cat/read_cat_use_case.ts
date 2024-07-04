import myUrl from "@/domain/my_url";
import MyResponse from "../MyResponse";

export default class ReadCatUseCase{
    async read():Promise<MyResponse>{
        try {
            if(!sessionStorage.getItem('uid')) return new MyResponse(false, "로그인이 필요합니다.", null)
            
            const cachedData = sessionStorage.getItem('catData')
            if(cachedData){
                return new MyResponse(true, "고양이 데이터 조회에 성공했습니다.", JSON.parse(cachedData))
            }
            
            const userID = sessionStorage.getItem('uid')
            const res = await fetch(`${myUrl}/api/v1/cat/read`, {
                headers: { "Content-type": "application/json" },
                method: "POST",
                body : JSON.stringify({
                    userID
                })
            })
            const data = await res.json()
            const catData = data.data

            sessionStorage.setItem('catData', JSON.stringify(catData))

            if(!data.success) return new MyResponse(false, "고양이 데이터 조회에 실패했습니다.", data.data)
            return new MyResponse(true, "고양이 데이터 조회에 성공했습니다.", data.data)
        } catch (error) {
            return new MyResponse(false, "고양이 데이터 조회에 실패했습니다.", String(error))
        }
    }
}