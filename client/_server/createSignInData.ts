import { SolanaSignInInput } from "@solana/wallet-standard-features";

export async function createSignInData() {

    const domain = "example.com";
    const signInData: SolanaSignInInput = {
        domain,
        nonce: "1000010000",
      };

      return signInData;

};