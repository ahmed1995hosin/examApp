import { useForget } from "./../_components/providers/forget-provider";
import { useMutation } from "@tanstack/react-query";
import { ResetPasswordFields } from "@/lib/types/auth";
import ResetPasswordService from "../_services/reset-password.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function useResetPassword() {
  // state
  const router = useRouter();

  // use forgetProvider
  const { email, prevStep } = useForget();

  // mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (field: ResetPasswordFields) => {
      const respone = await ResetPasswordService({
        ...field,
        email: email,
      });
      if ("code" in respone) {
        throw new Error(respone.message);
      }
      return respone;
    },
    onSuccess: (data, variables, context) => {
      // toast
      toast.success("Your Password reset successfully");
      // redirect
      router.push("/login");
    },
    onError: (error, variables, context) => {
      // toast
      toast.error(error.message);
      // previous step
      prevStep();
    },
  });
  return { isPending, error, resetPassword: mutate };
}
