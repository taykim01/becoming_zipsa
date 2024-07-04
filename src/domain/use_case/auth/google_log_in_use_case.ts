import { auth, provider } from "@/firebase";
import { signInWithPopup, GoogleAuthProvider, deleteUser } from "firebase/auth";
import MyResponse from "../MyResponse"
import myUrl from "@/domain/my_url";

export default class GoogleLogInUseCase {
    async logIn(): Promise<MyResponse> {
        try {
            const response = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(response);

            const email = response.user.email
            const res = await fetch(`${myUrl}/api/v1/user/read/query/email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            const data = await res.json()
            if (data.data === "no_user_with_email") {
                const user = auth.currentUser
                if (!user) return new MyResponse(false, "계정 삭제에 실패했습니다.", {})
                await deleteUser(user)
                return new MyResponse(false, "해당 이메일의 계정 정보가 없습니다.", null)
            }

            const uid = response.user.uid
            sessionStorage.setItem('uid', uid)

            if (!credential) return new MyResponse(true, "이미 인증된 사용자", response.user)
            return new MyResponse(true, "인증에 성공했습니다.", response.user)
        } catch (error) {
            return new MyResponse(false, "인증에 실패했습니다.", String(error))
        }
    }
}
