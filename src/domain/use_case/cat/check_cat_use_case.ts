import MyResponse from "../MyResponse";

export default class CheckCatUseCase{
    async check():Promise<MyResponse>{
        try {
            const userID = sessionStorage.getItem("uid")
            const res = await fetch(`http://localhost:3000/api/v1/cat/read`, {
                headers: { "Content-type": "application/json" },
                method: "POST",
                body : JSON.stringify({
                    userID
                })
            })
            const data = await res.json()
            if(data.data === "no_cat") return new MyResponse(true, "고양이가 없습니다.", "no_cat")
            return new MyResponse(true, "고양이가 있습니다.", "yes_cat")
        } catch (error) {
            return new MyResponse(false, "고양이를 찾는 데 실패했습니다.", String(error))
        }
    }
}