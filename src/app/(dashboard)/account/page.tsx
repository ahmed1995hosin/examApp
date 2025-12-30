import TitleHeader from "./../components/title-header";
import { UserRound } from "lucide-react";
import AccountSettingContent from "./_components/account-setting-content";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Account Settings",
  description:
    "Manage your account settings, update profile information and preferences.",
  keywords: "account, profile, settings, update",
  authors: [{ name: "Ahmed Hosin" }],
};

export default async function Account() {
  // user
  const session: Session | null = await getServerSession(authOptions);

  return (
    <>
      <TitleHeader
        title="Account Settings"
        icon={<UserRound className="w-11 h-11 text-white" />}
      />

      {/* section content */}
      <AccountSettingContent user={session} />
    </>
  );
}
