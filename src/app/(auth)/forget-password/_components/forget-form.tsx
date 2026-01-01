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
import { MoveRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordEmailSchema } from "@/lib/schemas/auth.schema";
import useForgetPassword from "../_hook/use-forget-password";
import { ForgetPasswordField } from "@/lib/types/auth";
import { useForget } from "./providers/forget-provider";

export default function ForgetPasswordForm() {
  // form
  const form = useForm<ForgetPasswordField>({
    defaultValues: {
      email: "",
    },
    reValidateMode: "onChange",
    resolver: zodResolver(forgetPasswordEmailSchema),
  });

  // mutation forget password
  const { isPending, forgetPassword } = useForgetPassword();

  // use forgetProvider
  const { nextStep } = useForget();

  // submit handler
  const onSubmit: SubmitHandler<ForgetPasswordField> = async (data) => {
    forgetPassword(data, {
      // on success
      onSuccess: () => {
        //next step
        nextStep();
      },

      // on error
      onError: (error) => {
        // set error
        form.setError("email", {
          type: "custom",
          message: error.message,
        });
        console.log(error);
      },
    });
  };

  return (
    <>
      {/* heading forget password */}
      <h1 className="text-gray-800 text-3xl font-bold font-inter  text-left">
        Forgot Password
      </h1>
      <p className="text-gray-500  text-base text-left mt-2.5 mb-6">
        Don’t worry, we will help you recover your account.
      </p>

      {/* form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input
                  {...field}
                  placeholder="user@example.com"
                  error={Boolean(form.formState.errors.email)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* submit button */}
          <div className="flex items-center justify-center py-6">
            <Button
              disabled={
                isPending ||
                (!form.formState.isValid && form.formState.isSubmitted)
              }
              type="submit"
              className="w-full"
            >
              Continue
              <MoveRight className="ml-2.5" />
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
