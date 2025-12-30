"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, UserRound, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function UserDrop() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0">
          <EllipsisVertical className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 text-sm rounded-none" align="end">
        {/* account */}
        <Link href={"/account"}>
          <DropdownMenuItem className="p-4 flex items-center gap-2 text-gray-800 ">
            <UserRound /> Account
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="p-4 flex items-center gap-2 text-red-600 "
        >
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
