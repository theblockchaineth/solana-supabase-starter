import NextAuth from "next-auth"
import { SignJWT } from 'jose'

import Credentials from "next-auth/providers/credentials"
import type { User } from "next-auth"

import verifySIWS from "./_server/verifySIWS"
import type { SolanaSignInInput } from "@solana/wallet-standard-features"
import { cookies } from 'next/headers'

import createNewUserData from "./_server/createNewUser"
import { supabaseAdminClient } from "./_components/supabase/supabaseAdminClient"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [

    Credentials({
      credentials: {
        domain: { label: "Domain", type: "text" },
        nonce: { label: "Nonce", type: "text" },
        accountAddress: { label: "Account Address", type: "text" },
        signature: { label: "Signature", type: "text" },
        signedMessage: { label: "Signed Message", type: "text" }
      },

      authorize: async (credentials) => {

        if (!credentials) {
          throw new Error("Invalid credentials.")
        }

        const credentialsIn: SolanaSignInInput = {
          domain: credentials.domain as string,
          nonce: credentials.nonce as string
        }

        const results = await verifySIWS(credentialsIn, credentials.accountAddress as string, credentials.signature as string, credentials.signedMessage as string)

        if (!results || credentialsIn.domain !== process.env.NEXT_PUBLIC_WEBSITE_DOMAIN) {
          throw new Error("Invalid credentials.")
        } else {
          const user: User = {
            id: (credentials.accountAddress as string).replace('"', ''),
            name: (credentials.accountAddress as string).replace('"', ''),
          }

          const newUser = createNewUserData(credentials.accountAddress as string)
          await supabaseAdminClient.from('wallets').upsert([newUser], { onConflict: 'wallet', ignoreDuplicates: true })

          return user
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET

      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: token.name as string || "",
          id: token.name,
          role: "authenticated"
        }
        session.user = { name: token.name as string, id: token.name as string, email: token.email as string }
        session.supabaseAccessToken = await new SignJWT(payload)
          .setProtectedHeader({ alg: 'HS256' })
          .sign(new TextEncoder().encode(signingSecret))
      }
      
      if(session.supabaseAccessToken) {
        const cookieStore = await cookies()
        cookieStore.set('SUPABASE_AUTH_TOKEN', session.supabaseAccessToken, { secure: true })
      }

      return session
    },
  },
});
