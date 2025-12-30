"use client";

import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function TitleHeader({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) {
  // router
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    router.back();
  };
  return (
    <div className="flex  items-center justify- gap-2.5 p-6">
      {/* icon back not home */}
      {pathname !== "/" && (
        <button
          className="border border-blue-600 text-blue-600 py-[27px] px-2 cursor-pointer transition-all hover:bg-blue-50"
          onClick={handleBack}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      <div className="py-4 px-4 flex gap-4 bg-blue-600 flex-auto">
        {icon && icon}
        <h1 className="text-[32px] font-semibold font-inter text-white">
          {title}
        </h1>
      </div>
    </div>
  );
}
