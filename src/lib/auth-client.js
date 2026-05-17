import { createAuthClient } from "better-auth/react"

const client = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL
})

export const authClient = client
export const { signIn, signUp, useSession } = client