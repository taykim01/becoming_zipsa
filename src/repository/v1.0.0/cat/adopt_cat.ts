import RepositoryResponse from "@/repository/repository_response"
import CatModel, { Cat, CatSex, CatType, CatChat } from "./cat"
import URL from "@/repository/url"

export default class AdoptCat {
    async verifyInput(
        catName: string,
        color: CatType,
        sex: CatSex
    ): Promise<RepositoryResponse> {
        if (!catName) return new RepositoryResponse(false, "고양이 이름을 입력해주세요.")
        if (!color) return new RepositoryResponse(false, "색상을 선택해주세요.")
        if (!sex) return new RepositoryResponse(false, "성별을 선택해주세요.")
        return new RepositoryResponse(true, "검증에 성공했습니다.")
    }

    async adopt(
        catName: string,
        color: CatType,
        sex: CatSex
    ): Promise<RepositoryResponse> {
        try {
            const user_id = localStorage.getItem('id')
            if (!user_id) return new RepositoryResponse(false, "세션이 없습니다.", {})

            const cat: Cat = {
                user_id: user_id,
                name: catName,
                color: color,
                sex: sex,
                hunger: 50,
                health: 50,
                affection: 50,
                chapter: "아기 고양이",
                chats: [] as CatChat[],
                neutered: false,
                age: 0,
                birthday: new Date(),
            }
            const newCat = new CatModel(cat)
            const catData = newCat.toObject()


            const res = await fetch(`${URL}/api/v1.0.0/cat/create`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    user_id,
                    catData
                })
            })
            const data = await res.json()
            if (!data.success) return new RepositoryResponse(false, "고양이 데이터 생성에 실패했습니다.")

            
            const cat_id = data.data
            const addCatRes = await fetch(`${URL}/api/v1.0.0/user/update/add-cat`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    user_id,
                    cat_id
                })
            })
            const addCatData = await addCatRes.json()
            if (!addCatData.success) return new RepositoryResponse(false, "유저에게 고양이를 추가하는데 실패했습니다.")


            localStorage.setItem('catData', JSON.stringify(catData))


            return new RepositoryResponse(true, "고양이 데이터 생성에 성공했습니다.")
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}
