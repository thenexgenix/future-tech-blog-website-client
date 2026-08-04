import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://future-tech-blog-website-client.vercel.app"
})

export const { signIn, signUp, useSession } = createAuthClient()