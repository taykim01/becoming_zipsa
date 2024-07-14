import { auth } from "@/firebase"
import RepositoryResponse from "@/repository/repository_response";
import URL from "@/repository/url";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { User } from "./user";


export default class EmailSignUp {
    private email: string = ""
    private password: string = ""
    private name: string = ""
    private user_id: string = ""

    async verifyInput(
        email: string,
        password: string,
        passwordCheck: string,
        name: string
    ): Promise<RepositoryResponse> {
        try {
            //이메일 정규식 확인
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(email)) return new RepositoryResponse(false, "이메일 형식에 맞게 써 주세요.", {})
            this.email = email
            //패스워드 로직 통과하는지 확인
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
if (!passwordRegex.test(password)) {
    return new RepositoryResponse(false, "비밀번호는 알파벳, 특수문자와 숫자를 포함한 6자 이상의 문자로 구성해야 합니다.", {});
}

            //패스워드 체크가 일치하는지 확인
            if (passwordCheck !== password) return new RepositoryResponse(false, "비밀번호가 일치하지 않습니다.", {})
            this.password = password
            //name 빈 string 아닌지 확인
            if (name === "") return new RepositoryResponse(false, "이름을 입력해주세요", {})
            this.name = name

            return new RepositoryResponse(true, "유효성 검사에 성공했습니다.", {})
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }

    async signUp(): Promise<RepositoryResponse> {
        try {
            const response = await createUserWithEmailAndPassword(auth, this.email, this.password)
            this.user_id = response.user.uid

            return new RepositoryResponse(true, "인증에 성공했습니다.", this.user_id)
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }

    async deleteAuth(): Promise<RepositoryResponse> {
        try {
            const user = auth.currentUser
            if (!user) return new RepositoryResponse(false, "계정 삭제에 실패했습니다.", {})
            await deleteUser(user)
            return new RepositoryResponse(true, "계정 삭제에 성공했습니다.", {})
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }

    async createUser(): Promise<RepositoryResponse> {
        try {
            const userData: User = {
                email: this.email,
                name: this.name,
                cats: []
            }
            const user_id = this.user_id
            const res = await fetch(`${URL}/api/v1.0.0/user/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userData,
                    user_id
                })
            })
            const data = await res.json()
            if (!data.success) return new RepositoryResponse(false, "유저 데이터 생성에 실패했습니다.", {})

            localStorage.setItem("uid", this.user_id)

            return new RepositoryResponse(true, "유저 데이터 생성에 성공했습니다.", data.data)
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}
