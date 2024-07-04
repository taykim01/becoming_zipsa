const url = {
    "production": "https://stardenburdenhardenbart.vercel.app",
    "test": "https://stardenburdenhardenbart.vercel.app",
    "development": "http://localhost:3000"
}

const myUrl = url[process.env.NEXT_PUBLIC_ENVIRONMENT as "production" | "test" | "development"];

export default myUrl;