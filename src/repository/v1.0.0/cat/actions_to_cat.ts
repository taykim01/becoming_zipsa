import URL from "@/repository/url"
import isJSON from "../../../utils/is_json"
import { CatActionTypes } from "@/app/(pages)/my-cat/components/interaction_group"
import RepositoryResponse from "@/repository/repository_response"

export default class ActionsToCat {
    async applyAction(catAction: CatActionTypes): Promise<RepositoryResponse> {
        try {
            const catDataJSON = localStorage.getItem("catData")
            if (!catDataJSON) return new RepositoryResponse(false, "고양이 정보를 불러오는데 실패했습니다.", {})
            const catData = isJSON(catDataJSON) ? JSON.parse(catDataJSON) : catDataJSON
            const catStatus = {
                hunger: catData.hunger,
                health: catData.health,
                affection: catData.affection
            }

            if (catData.health === 0 && catAction !== "밥주기" && catAction !== "사진찍기") {
                const catUpdateRes = await fetch(`${URL}/api/v1.0.0/cat/update/status`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        cat_id: catData.id,
                        update_data: catStatus,
                    })
                })
                if (!catUpdateRes) return new RepositoryResponse(false, "고양이 상태 업데이트에 실패했습니다.", {})


                const catFeelingRes = "negative";
                const makeResponseRes = await fetch(`${URL}/api/v1.0.0/llm`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        messages: [
                            { role: "system", content: `너는 힘들어서 아무것도 안하고 싶은 고양이야.` },
                            { role: "user", content: `${catAction}을 하자는 집사에게 거절의 한마디` },
                        ]
                    })
                })
                const makeResponseData = await makeResponseRes.json()
                const catResponse = isJSON(makeResponseData.data) ? JSON.parse(makeResponseData.data) : makeResponseData.data
                if (!makeResponseData.success) return new RepositoryResponse(false, "고양이 대화 생성에 실패했습니다.", {})
                const finalResponse = { catFeelingRes, catResponse }
                return new RepositoryResponse(true, "행동에 성공했습니다.", finalResponse)
            }
            else if (catData.hunger === 0 && catAction === "사냥놀이") {
                const catUpdateRes = await fetch(`${URL}/api/v1.0.0/cat/update/status`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        cat_id: catData.id,
                        update_data: catStatus,
                    })
                })
                if (!catUpdateRes) return new RepositoryResponse(false, "고양이 상태 업데이트에 실패했습니다.", {})


                const catFeelingRes = "negative";
                const makeResponseRes = await fetch(`${URL}/api/v1.0.0/llm`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        messages: [
                            { role: "system", content: `너는 배고파서 사냥놀이가 하기 싫은 고양이야.` },
                            { role: "user", content: `${catAction}을 하자는 집사에게 거절의 한마디` },
                        ]
                    })
                })
                const makeResponseData = await makeResponseRes.json()
                const catResponse = isJSON(makeResponseData.data) ? JSON.parse(makeResponseData.data) : makeResponseData.data
                if (!makeResponseData.success) return new RepositoryResponse(false, "고양이 대화 생성에 실패했습니다.", {})
                const finalResponse = { catFeelingRes, catResponse }
                return new RepositoryResponse(true, "행동에 성공했습니다.", finalResponse)
            }

            else {
                switch (catAction) {
                    case "밥주기":
                        catStatus.hunger += 90
                        catStatus.health += 10
                        break
                    case "간식주기":
                        catStatus.hunger += 10
                        catStatus.health -= 2
                        break
                    case "사냥놀이":
                        catStatus.health -= 2
                        catStatus.affection += 20
                        catStatus.hunger -= 10
                        break
                    case "쓰다듬기":
                        catStatus.affection += 10
                        catStatus.health -= 2
                        break
                    case "빗어주기":
                        catStatus.health -= 2
                        catStatus.affection += 10
                        break
                    case "사진찍기":
                        catStatus.affection += 10
                        break
                    default:
                        return new RepositoryResponse(false, "알 수 없는 행동입니다.", {})
                }
                catStatus.hunger = Math.min(Math.max(catStatus.hunger, 0), 100)
                catStatus.health = Math.min(Math.max(catStatus.health, 0), 100)
                catStatus.affection = Math.min(Math.max(catStatus.affection, 0), 100)




                const catUpdateRes = await fetch(`${URL}/api/v1.0.0/cat/update/status`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        cat_id: catData.id,
                        update_data: catStatus,
                    })
                })
                if (!catUpdateRes) return new RepositoryResponse(false, "고양이 상태 업데이트에 실패했습니다.", {})


                const catFeelingRes = Math.random() < 0.6 ? "positive" : "negative";
                const makeResponseRes = await fetch(`${URL}/api/v1.0.0/llm`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        messages: [
                            { role: "system", content: ` ${catAction}에 대한 반응으로 고양이가 할 법한 한마디, ${catFeelingRes}한 느낌으로` },
                            { role: "user", content: catAction },
                        ]
                    })
                })
                const makeResponseData = await makeResponseRes.json()
                const catResponse = isJSON(makeResponseData.data) ? JSON.parse(makeResponseData.data) : makeResponseData.data
                if (!makeResponseData.success) return new RepositoryResponse(false, "고양이 대화 생성에 실패했습니다.", {})
                const finalResponse = { catFeelingRes, catResponse }
                return new RepositoryResponse(true, "행동에 성공했습니다.", finalResponse)
            }
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}