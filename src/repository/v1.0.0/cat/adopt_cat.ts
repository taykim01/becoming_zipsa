import RepositoryResponse from "@/repository/repository_response"
import CatModel, { Cat, CatSex, CatType, CatChat } from "./cat"
import URL from "@/repository/url"

export default class AdoptCat {
    async adopt(
        catName: string,
        color: CatType,
        sex: CatSex
    ): Promise<RepositoryResponse> {
        try {
            const user_id = sessionStorage.getItem('id')
            if (!user_id) return new RepositoryResponse(false, "세션이 없습니다.", {})

            const catData: Cat = {
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
            const newCat = new CatModel(catData)


            const res = await fetch(`${URL}/api/v0.1.0/cat/create`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    user_id,
                    catData: newCat.toObject()
                })
            })
            const data = await res.json()
            if (!data.success) return new RepositoryResponse(false, "고양이 데이터 생성에 실패했습니다.")
            return new RepositoryResponse(true, "고양이 데이터 생성에 성공했습니다.")
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}
