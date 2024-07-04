const myUrl =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
        ? "https://stardenburdenhardenbart.vercel.app"
        : "http://localhost:3000";

export default myUrl;