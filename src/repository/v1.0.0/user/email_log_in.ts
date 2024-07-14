import { auth } from "@/firebase"
import RepositoryResponse from "@/repository/repository_response"
import URL from "@/repository/url"
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth"

export default class EmailLogIn {
    async logIn(
        email: string,
        password: string
    ): Promise<RepositoryResponse> {
        try {
            const res = await fetch(`${URL}/api/v1.0.0/user/read/query/email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (data.data === "no_user_with_email") return new RepositoryResponse(false, "해당 이메일의 계정 정보가 없습니다.", null);

            await setPersistence(auth, browserLocalPersistence);

            const response = await signInWithEmailAndPassword(auth, email, password);
            const uid = response.user.uid;
            localStorage.setItem("id", uid);

            return new RepositoryResponse(true, "인증에 성공했습니다.", response.user);
        } catch (error) {
            const errMsg = String(error);
            if (errMsg.includes("wrong-password")) return new RepositoryResponse(false, "비밀번호가 틀렸습니다.", null);
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error));
        }
    }
}
