import NextAuth, { type DefaultSession } from "next-auth"
 
declare module "next-auth" {
  interface Session {
    supabaseAccessToken?: string
    user: {
      name: string
    }
  }
}