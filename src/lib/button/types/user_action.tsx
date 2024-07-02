export default function UserAction(){
    return(
    <button className="flex gap-3 items-center px-5 py-3 rounded-full border-white border-opacity-50 border-2 bg-white bg-opacity-10">
        <ButtonImage></ButtonImage>
        <ButtonString Text="밥 주기"></ButtonString>
    </button>
    )
}

function ButtonImage(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none"><path fill="#B06C3B" d="M16.666 12.5a1.042 1.042 0 0 0 0 2.083V12.5Zm-6.048-2.285L9.88 9.48l.737.736Zm10.215-1.882a4.167 4.167 0 0 1-4.167 4.167v2.083a6.25 6.25 0 0 0 6.25-6.25h-2.083Zm-4.167-4.167a4.167 4.167 0 0 1 4.167 4.167h2.083a6.25 6.25 0 0 0-6.25-6.25v2.083ZM12.5 8.333a4.167 4.167 0 0 1 4.166-4.167V2.083a6.25 6.25 0 0 0-6.25 6.25H12.5Zm-1.146 2.619.249-.249L10.13 9.23l-.249.249 1.473 1.473Zm.64 2.693-.64-.64-1.473 1.474.64.64 1.473-1.474Zm2.303-.25-.249.25 1.473 1.473.25-.249-1.474-1.473Zm1.474 1.474c.164-.164.463-.286.895-.286V12.5c-.769 0-1.684.21-2.369.896l1.474 1.473Zm-5.25.25a3.536 3.536 0 0 0 5 0l-1.473-1.474a1.453 1.453 0 0 1-2.054 0l-1.473 1.473Zm-.64-5.64a3.536 3.536 0 0 0 0 5l1.473-1.473a1.452 1.452 0 0 1 0-2.054L9.881 9.479Zm.535-1.146c0 .433-.121.732-.286.897l1.473 1.473c.685-.685.897-1.6.897-2.37h-2.084Z"/><path stroke="#B06C3B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.083" d="m6.77 16.146 3.126-3.125 2.083 2.083-3.125 3.125-2.29 1.374a.469.469 0 0 1-.573-.07l-.524-.524a.469.469 0 0 1-.07-.573l1.374-2.29Z"/></svg>
    )
}

function ButtonString(props:{Text: string}){
    return(
        <div className="text-m22">
            {props.Text}
        </div>
    )
}