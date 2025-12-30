import { useMutation } from "@tanstack/react-query";
import DeleteAccountService from "../_services/delete-account.service";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function useDeleteAccount() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async () => {
      const respone = await DeleteAccountService();
      if ("code" in respone) {
        if (respone.code === 401) {
          toast.error(
            respone.message || "Something went wrong! Please login again."
          );
          await new Promise((resolve) => setTimeout(resolve, 2000));
          signOut({ callbackUrl: "/login" });
        }
        throw new Error(respone.message);
      }
      return respone;
    },
  });
  return { isPending, error, deleteAccount: mutate };
}
