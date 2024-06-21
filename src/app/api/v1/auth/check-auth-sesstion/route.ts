export async function POST(request:Request) {
    try {
        return new Response(
            JSON.stringify({
                success: true,
                message: "로그인 성공",
                data: {}
            })
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "로그인 실패",
                data: String(error)
            })
        )
    }
}