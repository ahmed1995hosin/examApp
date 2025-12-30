import { useMutation } from "@tanstack/react-query";
import { AccountFields } from "@/lib/schemas/account.schema";
import UpdateAccountService from "./../_services/update-account.service";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function useUpdateProfile() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: AccountFields) => {
      const respone = await UpdateAccountService(fields);
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
  return { isPending, error, updateAccount: mutate };
}
