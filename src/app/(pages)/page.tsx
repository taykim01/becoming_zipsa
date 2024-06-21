"use client"
import SignUpUseCase from "@/domain/use_case/auth/sign_up_use_case"

export default function Page(){
    const signUp = async ()=>{
        const sign_up = new SignUpUseCase()
        await sign_up.signUp()
    }
    return ( 
    <div>
        <button onClick={signUp}>
            가입하기
        </button>
    </div>)
}