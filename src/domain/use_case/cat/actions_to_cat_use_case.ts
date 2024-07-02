import MyResponse from "../MyResponse"

export default class ActionsToCatUseCase {
    async applyAction(catAction: string, userID: string, catID: string): Promise<MyResponse> {
        try {
            const catReadRes = await fetch(`http://localhost:3000/api/v1/cat/read`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    userID, catID
                })
            })
            const catReadData = await catReadRes.json()
            if(!catReadData.success) return new MyResponse(false, "고양이 상태 가져오기에 실패했습니다.", {})
            const updateData = catReadData.catStatus
            switch (catAction) {
                case "giveFood":
                    updateData.hunger += 90
                    updateData.health += 10
                    break
                case "giveSnack":
                    updateData.hunger += 10
                    updateData.health -= 2
                    break
                case "play":
                    updateData.health -= 2
                    updateData.affection += 20
                    updateData.hunger -= 10
                    break
                case "pat":
                    updateData.affection += 10
                    updateData.health -= 2
                    break
                case "brush":
                    updateData.health -=2
                    updateData.affection += 10
                    break
                default:
                    return new MyResponse(false, "알 수 없는 행동입니다.", {})
            }
            updateData.hunger = Math.min(Math.max(updateData.hunger, 0), 100)
            updateData.health = Math.min(Math.max(updateData.health, 0), 100)
            updateData.affection = Math.min(Math.max(updateData.affection, 0), 100)

            
            const catActionRes = Math.random() < 0.6 ? "positive" : "nagative" ;


            const catUpdateRes = await fetch(`http://localhost:3000/api/v1/cat/update`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    userID, catID, updateData
                })
            })
            if(!catUpdateRes) return new MyResponse(false, "고양이 상태 업데이트에 실패했습니다.", {})
            return new MyResponse(true, "행동에 성공했습니다.", [catAction, catActionRes])
        } catch (error) {
            return new MyResponse(false, "행동에 실패했습니다.", String(error))
        }
    }
}