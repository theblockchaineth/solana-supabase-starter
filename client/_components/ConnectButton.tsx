"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui";


export default function ConnectButton() {

    const [isClient, setIsClient] = useState(false);
    const { status } = useSession()
    const { setVisible } = useWalletModal();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if(!isClient) return null;

    return (
        <>
        {
            status === "authenticated" ? 
                (<button className="btn btn-sm btn-ghost font-special" onClick={() => signOut()}>DISCONNECT</button>) 
                    : 
                (<button className="btn btn-sm btn-ghost font-special" onClick={() => setVisible(true)}>CONNECT</button>)
        }
        
        </>
    );
}