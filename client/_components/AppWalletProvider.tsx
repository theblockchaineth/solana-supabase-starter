"use client";
 
import React, { useMemo, useCallback } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { SessionProvider } from "next-auth/react";
import createSignInData from "@/_server/createSignInData";
import { encode } from "bs58";
import { signIn } from "next-auth/react";
import type { Adapter } from "@solana/wallet-adapter-base";
 
export default function AppWalletProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {

    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
      () => [
      ],
      [network],
    );

    const autoSignIn = useCallback(async (adapter: Adapter) => {

      const input = await createSignInData();
      // @ts-ignore
      const output = await adapter.signIn(input);
    
      const nextAuthSignin = await signIn("credentials", {
        domain: input.domain,
        nonce: input.nonce,
        accountAddress: encode(output.account.publicKey),
        signature: encode(output.signature),
        signedMessage: encode(output.signedMessage),
      }, { redirect: false });

      console.log(nextAuthSignin);

      if (!nextAuthSignin?.ok) throw new Error("Sign In verification failed!");
    
      return false;
      
    }, []);
   
    return (
      <SessionProvider>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={autoSignIn}>
            <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </SessionProvider>
    );
  }