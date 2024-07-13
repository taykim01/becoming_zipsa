import RepositoryResponse from "@/repository/repository_response";
import URL from "@/repository/url";
import { CatChapter } from "./cat";

export default class UpdateAge {
    private catChapters: { [key: string]: number } = {
        "첫 만남": 0,
        "아기 고양이": 60,
        "청소년 고양이": 120,
        "어른 고양이": 300,
        "나이든 고양이": 420,
        "무지개 다리": 421
    }


    private lifeCycle: { [key: string]: string } = {
        "청소년 고양이": "neutering",
        "나이든 고양이": "disease"
    }


    private async updateAge(cat_id: string, newCatAge: number): Promise<RepositoryResponse> {
        try {
            const res = await fetch(`${URL}/api/v1.0.0/cat/update/age`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cat_id,
                    newCatAge
                })
            })
            const data = await res.json()
            if (!data.success) return new RepositoryResponse(false, "나이 업데이트에 실패했습니다.", data.message)


            return new RepositoryResponse(true, "나이 업데이트에 성공했습니다.")
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }


    private async updateChapter(cat_id: string, nextChapter: CatChapter): Promise<RepositoryResponse> {
        try {
            const res = await fetch(`${URL}/api/v1.0.0/cat/update/chapter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cat_id,
                    nextChapter,
                })
            })
            const data = await res.json()
            if (!data.success) return new RepositoryResponse(false, "챕터 업데이트에 실패했습니다.", data.message)
            
            return new RepositoryResponse(true, "챕터 업데이트에 성공했습니다.")
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }



    async update(): Promise<RepositoryResponse> {
        try {
            const catData = sessionStorage.getItem("catData")
            if (!catData) return new RepositoryResponse(false, "고양이 정보가 없습니다.")
            const cat_id = JSON.parse(catData).cat_id

            const oldAge = JSON.parse(catData).age
            const newCatAge = JSON.parse(catData).age + 1


            const updateCatRes = await this.updateAge(cat_id, newCatAge)
            if (!updateCatRes.success) return updateCatRes


            const oldCatChapter = Object.keys(this.catChapters).find(chapter => this.catChapters[chapter] === oldAge) as CatChapter
            const newCatChapter = Object.keys(this.catChapters).find(chapter => this.catChapters[chapter] === newCatAge) as CatChapter


            if (oldCatChapter === newCatChapter) return new RepositoryResponse(true, "나이 업데이트에 성공했습니다.")

            
            const updateChapterRes = await this.updateChapter(cat_id, newCatChapter)
            if (!updateChapterRes.success) return updateChapterRes


            if (!this.lifeCycle[newCatChapter]) return new RepositoryResponse(true, "나이 업데이트에 성공했습니다.")
            return new RepositoryResponse(true, "나이 업데이트에 성공했습니다.", this.lifeCycle[newCatChapter])
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}