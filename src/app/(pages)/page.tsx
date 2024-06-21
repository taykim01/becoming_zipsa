"use client"
import SignUpUseCase from "@/domain/use_case/auth/sign_up_use_case"

export default function Page(){
    const signUp = async ()=>{
        const sign_up = new SignUpUseCase()
        const response = await sign_up.signUp()
        console.log(response)
    }
    return ( 
    <div>
        <button onClick={signUp}>
            가입하기
        </button>
    </div>)
}