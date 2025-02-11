"use server";

import type { SolanaSignInInput, SolanaSignInOutput } from "@solana/wallet-standard-features";
import { verifySignIn } from "@solana/wallet-standard-util";
import bs58 from "bs58";
import { PublicKey } from "@solana/web3.js";

//  const verified = await verifySIWS(input, account.address, encode(signature), encode(signedMessage));
     
export default async function verifySIWS(
    input: SolanaSignInInput,
    accountAddress: string,
    signature: string,
    signedMessage: string,
  ): Promise<boolean> {

    const output: SolanaSignInOutput = {
        // @ts-ignore
      account: {
        publicKey: new PublicKey(accountAddress).toBytes(),
        address: accountAddress,
      },
      signature: new Uint8Array(bs58.decode(signature)),
      signedMessage: new Uint8Array(bs58.decode(signedMessage)),
    };

    console.log(input, output);
    return verifySignIn(input, output);
  }