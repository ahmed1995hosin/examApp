import { FolderCode } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import UserDrop from "./user-drop";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import SidebarLinks from "./sidebar-links";

export default async function Sidebar() {
  const user: Session | null = await getServerSession(authOptions);
  return (
    <aside className="w-1/4 bg-blue-50 p-10 flex flex-col">
      {/* logo exam app */}
      <div className="">
        <Link href={"/"} className="">
          <Image
            src="/assets/images/logo.svg"
            alt="exam app logo"
            width={192}
            height={37}
          />
        </Link>
        <div className="flex items-center gap-4 mt-2.5 text-blue-600">
          <FolderCode className=" w-8 h-8" />
          <span className="font-semibold text-xl">Exam App</span>
        </div>
      </div>

      {/* sidebar links */}
      <div className="flex flex-col mt-16 w-full justify-between h-full ">
        {/* links */}
        <SidebarLinks />

        {/* user information */}
        <div className="flex gap-4">
          <div className=" border  border-blue-600">
            <div className="h-[54px] w-[54px] border overflow-hidden border-blue-600">
              <Image
                src="/assets/images/profile.svg"
                alt={user?.user.firstName || ""}
                width={100}
                height={0}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <div>
              <h3 className="text-blue-600">{user?.user.firstName}</h3>
              <p className="text-gray-500 text-sm">{user?.user.email}</p>
            </div>

            {/* user Dropdown */}
            <UserDrop />
          </div>
        </div>
      </div>
    </aside>
  );
}
