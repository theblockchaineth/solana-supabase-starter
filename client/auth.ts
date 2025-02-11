import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { User } from "next-auth"
import verifySIWS from "./_server/verifySIWS"
import type { SolanaSignInInput, SolanaSignInOutput } from "@solana/wallet-standard-features"
import { decode } from "bs58"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [

    Credentials({
      credentials: {
        domain: { label: "Domain", type: "text" },
        nonce: { label: "Nonce", type: "text"  },
        accountAddress: { label: "Account Address", type: "text"  },
        signature: { label: "Signature", type: "text"  },
        signedMessage: { label: "Signed Message", type: "text"  }
      },

      authorize: async (credentials) => {

        console.log("credentials", credentials)

        if (!credentials) {
          throw new Error("Invalid credentials.")
        }

        const credentialsIn: SolanaSignInInput = {
          domain: credentials.domain as string,
          nonce: credentials.nonce as string
        }

        const results = await verifySIWS(credentialsIn, credentials.accountAddress as string, credentials.signature as string, credentials.signedMessage as string)

        if(!results) {
          throw new Error("Invalid credentials.")
        } else {
          const user: User = {
            id: credentials.accountAddress as string
            }
          console.log("user", user)  
          return user
        }
      }
    })
  ], 
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.id = token.id as string
      return session
    },
  },
});
        