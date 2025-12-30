import { Button } from "@/components/ui/button";
import { TriangleAlert, X } from "lucide-react";
import useDeleteAccount from "../_hook/use-delete-account";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function AccountDeleteModal({
  openDeleteModal,
  setOpenDeleteModal,
}: {
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  if (!openDeleteModal) return null;

  // use useDeleteAccount
  const { isPending, deleteAccount } = useDeleteAccount();
  return (
    <div className="fixed top-0 left-0 bottom-0 w-screen h- bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center">
      <div className="">
        <div className="px-9 py-14 text-center bg-white relative">
          {/* icon close */}
          <span
            className="absolute top-3.5 right-3.5 cursor-pointer text-gray-500"
            onClick={() => setOpenDeleteModal(false)}
          >
            <X className="w-5 h-5" />
          </span>

          <div className="w-[110px] h-[110px] rounded-full bg-red-50 mx-auto p-[15px]">
            <div className="w-full h-full bg-red-100 rounded-full flex items-center justify-center">
              <TriangleAlert className="w-[50px] h-[50px] text-red-600" />
            </div>
          </div>

          <h3 className="text-lg font-medium  text-red-600 mt-8">
            Are you sure you want to delete your account?
          </h3>
          <p className="text-sm text-gray-500 mt-2.5">
            This action is permanent and cannot be undone.
          </p>
        </div>
        {/* buttons */}
        <div className="flex gap-2.5 py-6 px-14 bg-gray-50 border border-gray-200">
          {/* cancel */}
          <Button
            variant={"secondary"}
            type="button"
            className="flex-1"
            onClick={() => setOpenDeleteModal(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          {/* delete */}
          <Button
            variant={"destructive"}
            type="button"
            className="flex-1"
            onClick={() =>
              deleteAccount(undefined, {
                // success
                onSuccess: async (data) => {
                  toast.success("Account deleted successfully");
                  await new Promise((resolve) => setTimeout(resolve, 2000));
                  setOpenDeleteModal(false);
                  signOut({ callbackUrl: "/login" });
                },

                // error
                onError: (error) => {
                  toast.error(
                    error.message ||
                      "Something went wrong! Please try again later"
                  );
                },
              })
            }
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Yes, delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
