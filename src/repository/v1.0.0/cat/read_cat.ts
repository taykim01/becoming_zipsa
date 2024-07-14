import RepositoryResponse from "@/repository/repository_response"
import URL from "@/repository/url"

export default class ReadCat{
    async read(reload?: boolean):Promise<RepositoryResponse>{
        try {
            const user_id = localStorage.getItem('id')
            if(!user_id) return new RepositoryResponse(false, "로그인이 필요합니다.", null)
            
            const cachedData = localStorage.getItem('catData')
            if(cachedData && !reload) return new RepositoryResponse(true, "고양이 데이터 조회에 성공했습니다.", JSON.parse(cachedData))

            const getCatIdRes = await fetch(`${URL}/api/v1.0.0/user/read`, {
                headers: { "Content-type": "application/json" },
                method: "POST",
                body : JSON.stringify({
                    user_id
                })
            })
            const getCatIdData = await getCatIdRes.json()
            if(!getCatIdData.success) return new RepositoryResponse(false, "고양이 데이터 조회에 실패했습니다.")
            if(getCatIdData.data.cats.length === 0) return new RepositoryResponse(true, "고양이가 없습니다.", "no_cat")


            const cat_id = getCatIdData.data.cats[0]
            const res = await fetch(`${URL}/api/v1.0.0/cat/read`, {
                headers: { "Content-type": "application/json" },
                method: "POST",
                body : JSON.stringify({
                    cat_id
                })
            })
            const data = await res.json()
            const catData = data.data


            localStorage.setItem('catData', JSON.stringify(catData))

            
            if(!data.success) return new RepositoryResponse(false, "고양이 데이터 조회에 실패했습니다.")
            return new RepositoryResponse(true, "고양이 데이터 조회에 성공했습니다.", data.data)
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}