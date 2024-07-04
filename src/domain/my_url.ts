const url = {
    "production": "https://stardenburdenhardenbart.vercel.app",
    "test": "https://stardenburdenhardenbart.vercel.app",
    "development": "http://localhost:3000",
    "local": "http://192.168.45.106:3000"
}

export type AccessTypes = "production" | "test" | "development" | "local"

const myUrl = url[process.env.NEXT_PUBLIC_ENVIRONMENT as AccessTypes];

export default myUrl;