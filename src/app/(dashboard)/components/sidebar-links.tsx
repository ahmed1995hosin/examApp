"use client";

import Link from "next/link";
import { GraduationCap, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
export default function SidebarLinks() {
    // links
    const links = [
        {
            name: "Diplomas",
            href: "/",
            icon: <GraduationCap />,
        },
        {
            name: "Account Settings",
            href: "/account",
            icon: <UserRound />,
        },
    ];
        
    // pathname
    const pathname = usePathname();
   
        return (
        <ul className="flex flex-col gap-2.5 text-gray-500 text-base w-full">
            {links.map((link, i) => {
            const isActive = pathname === link.href;

            return (
                <li key={i}>
                <Link
                    href={link.href}
                    className={`flex items-center gap-2 p-4 transition-all border  hover:bg-blue-100 hover:text-blue-600 ${
                    isActive ? "bg-blue-100  border-blue-500 text-blue-600" : "border-transparent"
                    }`}
                >
                    <span>{link.icon}</span> {link.name}
                </Link>
                </li>
            );
            })}
        </ul>
        );
}
