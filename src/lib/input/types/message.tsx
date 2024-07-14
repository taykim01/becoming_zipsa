"use client"

import ChatLoading from "@/lib/chat_loading";
import { useState } from "react";


export default function Message(props: {
    onSend: (message: string) => void
    chatLoading: boolean
}) {
    const [message, setMessage] = useState('');
    const [chatLoading, setChatLoading] = useState(false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    }

    const sendMessage = () => {
        if (message.trim() !== '') {
            props.onSend(message);
            setMessage('');
        }
    }

    return (
        <div className="flex gap-3">
            <input
                className={`
                        px-5 py-3 border border-white-0.72 bg-white-0.5
                        rounded-2xl w-full font-fs-l text-black-1 text-16
                        focus:outline-none placeholder-black-0.2
                    `}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                value={message}
                placeholder="대화하기"
            />
            <button
                className="flex justify-center items-center focus:outline-none rounded-2xl bg-black-1 flex-shrink-0" style={{ width: '50px', height: '50px' }}
                onClick={sendMessage}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.856 13.7298L7.85877 12.7307C5.50556 11.9463 4.32895 11.5541 4.32895 10.8333C4.32895 10.1126 5.50556 9.72039 7.85877 8.93598L7.85877 8.93598L17.8719 5.59826C19.5277 5.04633 20.3556 4.77036 20.7926 5.20738C21.2297 5.6444 20.9537 6.47229 20.4018 8.12808L17.064 18.1412C16.2796 20.4945 15.8874 21.6711 15.1667 21.6711C14.4459 21.6711 14.0537 20.4945 13.2693 18.1412L12.2702 15.144L16.9571 10.4571C17.3476 10.0666 17.3476 9.43343 16.9571 9.04291C16.5666 8.65238 15.9334 8.65238 15.5429 9.04291L10.856 13.7298Z" fill="white" />
                </svg>
            </button>
            {props.chatLoading && <ChatLoading/>}
        </div>
    )
}