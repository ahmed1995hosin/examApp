"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import SubmitError from "@/components/shared/submit-error";
import { PasswordInput } from "@/components/shared/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/schemas/auth.schema";
import { ResetPasswordFields } from "@/lib/types/auth";
import useResetPassword from "./../_hook/reset-password";

export default function ResetPasswordForm() {
  // form
  const form = useForm<ResetPasswordFields>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    reValidateMode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
  });

  // mutation reset password
  const { isPending, error, resetPassword } = useResetPassword();

  // submit handler
  const onSubmit: SubmitHandler<ResetPasswordFields> = async (data) => {
    resetPassword(data);
  };

  return (
    <>
      {/* heading create new password */}
      <h1 className="text-gray-800 text-3xl font-bold font-inter  text-left">
        Create a New Password
      </h1>
      <p className="text-gray-500  text-base text-left mt-2.5 mb-6">
        Create a new strong password for your account.
      </p>

      {/* form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          {/* password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>New Password</FormLabel>
                <PasswordInput
                  {...field}
                  placeholder="********"
                  error={Boolean(form.formState.errors.password)}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* confirm password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel>Confirm Password</FormLabel>
                <PasswordInput
                  {...field}
                  placeholder="********"
                  error={Boolean(form.formState.errors.confirmPassword)}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* submit error */}
          {error && (
            <SubmitError message={error.message || "Something went wrong"} />
          )}

          {/* submit button */}
          <div className="flex items-center justify-center mb-9 mt-9">
            <Button
              disabled={
                isPending ||
                (!form.formState.isValid && form.formState.isSubmitted)
              }
              type="submit"
              className="w-full"
            >
              Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
