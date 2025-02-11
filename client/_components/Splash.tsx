"use client";

import { useSession } from "next-auth/react";

export default function Splash() {
    const { data: session } = useSession();
    
    return (
        <div className="flex items-center justify-center h-screen">
        <div className="text-3xl font-bold">Welcome to the Splash Page</div>
        <div className="text-3xl font-bold">Session: {session ? JSON.stringify(session) : "No session"}</div>
        </div>
    );
    }