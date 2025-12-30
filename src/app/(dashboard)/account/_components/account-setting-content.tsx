"use client";

import { signOut, useSession } from "next-auth/react";
import { CircleUserRound, Lock, LogOut } from "lucide-react";
import { useState } from "react";
import { Session } from "next-auth";
import Account from "../page";
import AccountSettingForm from "./account-setting-form";
import AccountChangePasswordForm from "./account-changepassword-form";

export default function AccountSettingContent({
  user,
}: {
  user: Session | null;
}) {
  // state
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  return (
    <section className="p-6">
      <div className="flex gap-6">
        {/* sidebar */}
        <div className="flex flex-col justify-between w-[285px] bg-white p-6 h-screen">
          <ul className="flex flex-col gap-2.5 text-gray-500 font-normal">
            {/* profile */}
            <li
              className={`flex items-center gap-2.5 py-2.5 px-4 cursor-pointer hover:bg-blue-50
                ${
                  activeTab === "profile" && "bg-blue-50 text-blue-600"
                } hover:text-blue-600 transition-all`}
              onClick={() => setActiveTab("profile")}
            >
              <CircleUserRound className="w-6 h-6 " />
              <span className="">Profile</span>
            </li>

            {/* change password */}
            <li
              className={`flex items-center gap-2.5 py-2.5 px-4 cursor-pointer hover:bg-blue-50
                ${
                  activeTab === "password" && "bg-blue-50 text-blue-600"
                } hover:text-blue-600 transition-all`}
              onClick={() => setActiveTab("password")}
            >
              <Lock className="w-6 h-6 " />
              <span className="">Change Password</span>
            </li>
          </ul>

          {/* logout */}
          <div
            className="flex items-center gap-2.5 py-2.5 px-4 cursor-pointer text-red-600 bg-red-50"
            onClick={() => {
              signOut({ callbackUrl: "/login" });
            }}
          >
            <LogOut className="w-6 h-6 " />
            <span className="">Logout</span>
          </div>
        </div>

        {/* content */}
        <div className="flex-1 bg-white">
          {/* update profile  */}
          {activeTab === "profile" && <AccountSettingForm user={user} />}

          {/* changepassword */}
          {activeTab === "password" && <AccountChangePasswordForm />}
        </div>
      </div>
    </section>
  );
}
