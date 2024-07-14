import { auth, provider } from "@/firebase";
import RepositoryResponse from "@/repository/repository_response";
import { signInWithPopup, GoogleAuthProvider, deleteUser } from "firebase/auth";
import URL from "@/repository/url";

export default class GoogleLogIn {
    async logIn(): Promise<RepositoryResponse> {
        try {
            const response = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(response);

            const email = response.user.email
            const res = await fetch(`${URL}/api/v1.0.0/user/read/query/email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            const data = await res.json()
            if (data.data === "no_user_with_email") {
                const user = auth.currentUser
                if (!user) return new RepositoryResponse(false, "계정 삭제에 실패했습니다.", {})
                await deleteUser(user)
                return new RepositoryResponse(false, "해당 이메일의 계정 정보가 없습니다.", null)
            }

            const uid = response.user.uid
            sessionStorage.setItem('id', uid)

            if (!credential) return new RepositoryResponse(true, "이미 인증된 사용자입니다.", response.user)
            return new RepositoryResponse(true, "인증에 성공했습니다.", response.user)
        } catch (error) {
            return new RepositoryResponse(false, "오류가 발생했습니다.", String(error))
        }
    }
}
