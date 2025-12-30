import { CircleAlert, CircleX } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";

export default function SubmitError({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "py-2.5 mt-10 mb-9 text-center border border-red-600 bg-red-50 relative",
        className
      )}
    >
      <div className="absolute top-0 right-1/2 -translate-y-1/2 ">
        <CircleAlert className="fill-current text-white rounded-full">
          <CircleX className="text-red-600 w-5 h-5" />
        </CircleAlert>
      </div>
      <p className="text-red-600 text-center">{message}</p>
    </div>
  );
}
