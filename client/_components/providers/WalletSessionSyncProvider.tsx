"use client";

import React, { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { deleteSupabaseCookie } from '@/_server/removeSupabaseCookie';

export function WalletSessionSyncProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const { data: session, status, } = useSession();
    const { disconnect, publicKey, connected } = useWallet();
    const publicKeyString = publicKey?.toBase58();


    useEffect(() => {
        const syncSession = async () => {
            // has session but wallet mismatched
            //@ts-ignore
            if (status === 'authenticated' && connected && session?.id !== publicKeyString) {
                try {
                    await signOut();
                    disconnect();
                    deleteSupabaseCookie();
                } catch (error) {
                    console.error(error);
                }
            }
            if (status === 'unauthenticated') {
                try {
                    deleteSupabaseCookie();
                } catch (error) {
                    console.error(error);
                }
            }
        };

        syncSession();
    }, [publicKeyString, session, status, connected]);

    return <div>{children}</div>;
}

export default WalletSessionSyncProvider;