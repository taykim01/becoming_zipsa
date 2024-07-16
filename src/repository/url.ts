const url = {
    "production": "https://www.becoming-zipsa.com",
    "test": "https://stardenburdenhardenbart-git-development-tae-eun-kims-projects.vercel.app",
    "development": "http://localhost:3000",
    "local": "http://172.30.1.69:3000"
}

export type AccessTypes = "production" | "test" | "development" | "local"

const URL = url[process.env.NEXT_PUBLIC_ENVIRONMENT as AccessTypes];

export default URL;