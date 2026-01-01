import { useMutation } from "@tanstack/react-query";
import { ChangePasswordFields } from "@/lib/schemas/account.schema";
import ChangePasswordService from "./../_services/change-password.service";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function useChangePassword() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: ChangePasswordFields) => {
      const respone = await ChangePasswordService(fields);
      if ("code" in respone) {
        if (respone.code === 401) {
          toast.error(respone.message);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          signOut({ callbackUrl: "/login" });
        }
        throw new Error(respone.message);
      }
      return respone;
    },
    onSuccess: async () => {
      toast.success("Your password has been updated.");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      signOut({ callbackUrl: "/login" });
    },
  });

  return { isPending, error, changePassword: mutate };
}
