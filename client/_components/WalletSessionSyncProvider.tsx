"use client";

import React, { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react'; 
import { useWallet } from '@solana/wallet-adapter-react'; 

export function WalletSessionSyncProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {

    const { data: session, status,  } = useSession();
    const { disconnect, publicKey, connected, connecting, disconnecting } = useWallet();
    const publicKeyString = publicKey?.toBase58(); 


    useEffect(() => {
        // has session but wallet mismatched
        //@ts-ignore
        if (status === 'authenticated' && connected && session?.id !== publicKeyString) {
            try {
                console.log('catch 1');
                signOut();
                disconnect();
            } catch (error) {
                console.error(error);
            }
        }
        
    }, [publicKeyString, session, status, connected]);

    return <div>{children}</div>;
}

export default WalletSessionSyncProvider;