import RepositoryResponse from "@/repository/repository_response"

export default class CheckSession {
    async check():Promise<RepositoryResponse>{
        try {
            const cachedData = sessionStorage.getItem('id')
            if(!cachedData) return new RepositoryResponse(false, "세션이 없습니다.")

            return new RepositoryResponse(true, "세션이 있습니다.", cachedData)
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}