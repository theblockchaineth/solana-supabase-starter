import { SolanaSignInInput } from "@solana/wallet-standard-features";

export async function createSignInData() {

    const domain = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN!;
    
    const signInData: SolanaSignInInput = {
        domain,
        // TODO: Update to a csrf
        nonce: "1000010000",
      };

      return signInData;

};
