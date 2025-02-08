"use client"

import { UserIcon, Bars3Icon } from "@heroicons/react/24/solid"

export default function Navbar() {
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
                        <li><a>Homepage</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="text-xl font-special pt-2 tracking-wider">findmykiller</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <UserIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}