"use client"

import { Bars3Icon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react";
import ConnectButton from "./ConnectButton";

export default function Navbar() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);


    if (loading) return null;

    return (
        <div className="fixed top-0 navbar bg-base-100 z-10 shadow-sm shadow-white/10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <Bars3Icon className="h-5 w-5" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Dummy</a></li>
                        <li><a>Drop</a></li>
                        <li><a>Down</a></li>
                        <li><a>Menu</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="text-xl font-special pt-2 tracking-wider">solana x nextauth x supabase </a>
            </div>
            <div className="navbar-end">
                <ConnectButton />
            </div>
        </div>
    );
}