import { LoginFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: LoginFields) => {
      const response = await signIn("credentials", {
        email: fields.email,
        password: fields.password,
        redirect: false,
      });

      if (!response?.ok) {
        throw new Error(response?.error || "Failed to login");
      }
      return response;
    },
    onSuccess: (data, variables, context) => {
      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") || "/";
      window.location.href = callbackUrl;
    },
  });
  return { isPending, error, login: mutate };
}
