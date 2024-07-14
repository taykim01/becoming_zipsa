import RepositoryResponse from "../../repository_response"
import { Cat } from "./cat"
import URL from "../../url"

export default class MedicateCat {
    async medicate(): Promise<RepositoryResponse> {
        try {
            const catInJSON = localStorage.getItem('catData')
            if(!catInJSON) return new RepositoryResponse(false, "고양이 정보가 없습니다.", {})
            
            const catData: Cat = JSON.parse(catInJSON);

            const res = await fetch(`${URL}/api/v1.0.0/cat/update/medicate`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    cat_id: catData.id
                })
            })
            const data = await res.json()
            if (!data.success) return new RepositoryResponse(false, "고양이 정보 업데이트에 실패했습니다.", data)

            return new RepositoryResponse(true, "무사히 치료에 성공했어요.", {})
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}