import { useMutation } from "@tanstack/react-query";
import { OtpField } from "@/lib/types/auth";
import VerifyOtpService from "../_services/otp.service";
import { toast } from "sonner";
import { useForget } from "./../_components/providers/forget-provider";

export default function useOtp() {
  // use forgetProvider
  const { nextStep } = useForget();

  // mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (field: OtpField) => {
      const respone = await VerifyOtpService(field);
      if ("code" in respone) {
        throw new Error(respone.message);
      }
      return respone;
    },

    onSuccess: () => {
      toast.success("OTP verified successfully");
      nextStep();
    },
  });
  return { isPending, error, verifyOtp: mutate };
}
