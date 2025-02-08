import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { User } from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
      console.log("credentials", credentials)
      if (!credentials) {
        throw new Error("Invalid credentials.")
      } 
      
      const user: User = { id: "1", name: "John Doe"}
      return user

      },
    }),
  ],
})