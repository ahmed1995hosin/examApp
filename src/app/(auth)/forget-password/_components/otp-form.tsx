"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useForget } from "./providers/forget-provider";
import { OtpField } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/lib/schemas/auth.schema";
import useOtp from "./../_hook/use-otp";
import useForgetPassword from "./../_hook/use-forget-password";
import { toast } from "sonner";

export default function OtpForm() {
  // use forgetProvider
  const { prevStep, email, time } = useForget();

  //  use otp mutation
  const { isPending, error, verifyOtp } = useOtp();

  // use forgetPassword mutation
  const {
    isPending: isPendingForgetPassword,
    error: errorForgetPassword,
    forgetPassword,
  } = useForgetPassword();

  // form
  const form = useForm<OtpField>({
    defaultValues: {
      otpcode: "",
    },
    reValidateMode: "onChange",
    resolver: zodResolver(otpSchema),
  });

  // submit handler
  const onSubmit: SubmitHandler<OtpField> = async (data) => {
    verifyOtp(data, {
      onError(error) {
        // set error
        form.setError("otpcode", {
          type: "custom",
          message: error.message,
        });
        console.log(error);
      },
    });
  };

  // resent Handler
  const resentHandler = async () => {
    forgetPassword(
      {
        email: email,
      },
      {
        // on error
        onError: (error) => {
          // set error
          toast.error(error.message);
          prevStep();
        },
      }
    );
  };

  return (
    <>
      {/* arrow back */}
      <div className="flex items-center justify-start mb-10">
        <button
          className="p-2 border-[1.5px] border-gray-200"
          onClick={prevStep}
        >
          <MoveLeft className="w-6 h-6 text-blue" />
        </button>
      </div>

      {/* heading Verify OTP*/}
      <h2 className="text-gray-800 text-3xl font-bold font-inter  text-left">
        Verify OTP
      </h2>
      <p className="text-gray-500  text-base text-left mt-2.5 mb-6">
        Please enter the 6-digits code we have sent to: <br />
        user@example.com
        <span
          className="ml-2.5 text-blue-600 underline cursor-pointer"
          onClick={prevStep}
        >
          Edit
        </span>
      </p>

      {/* form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" my-4">
          {/* otp input*/}
          <FormField
            control={form.control}
            name="otpcode"
            render={({ field }) => (
              <FormItem>
                <FormControl {...field}>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                {/* form desc and timer*/}
                <FormDescription className="text-center font-medium pt-6 text-sm text-gray-500">
                  {time > 0 && <>You can request another code in:{time}s</>}

                  {time === 0 && (
                    <>
                      Didn’t receive the code?{" "}
                      <span
                        className={`cursor-pointer ${
                          isPendingForgetPassword
                            ? "text-gray-400"
                            : "text-blue-600 underline"
                        }`}
                        onClick={
                          !isPendingForgetPassword ? resentHandler : void 0
                        }
                      >
                        {isPendingForgetPassword ? "Sending" : "Resend"}
                      </span>
                    </>
                  )}
                </FormDescription>

                {/* error message */}
                <FormMessage className="text-center" />
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
              Verify Code
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
