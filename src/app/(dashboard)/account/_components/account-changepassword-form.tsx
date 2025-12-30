import { PasswordInput } from "@/components/shared/password-input";
import SubmitError from "@/components/shared/submit-error";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ChangePasswordFields,
  changePasswordSchema,
} from "@/lib/schemas/account.schema";
import useChangePassword from "../_hook/use-change-password";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AccountChangePasswordForm() {
  // form
  const form = useForm<ChangePasswordFields>({
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  //   use ChangePassword
  const { isPending, error, changePassword } = useChangePassword();

  // onsubmit
  const onSubmit: SubmitHandler<ChangePasswordFields> = async (fields) => {
    changePassword(fields);
  };

  //
  return (
    <div className="p-6">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* old password */}
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    error={Boolean(form.formState.errors.oldPassword)}
                    {...field}
                    placeholder="********"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* new password*/}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    error={Boolean(form.formState.errors.password)}
                    {...field}
                    placeholder="********"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* re password */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    error={Boolean(form.formState.errors.rePassword)}
                    {...field}
                    placeholder="********"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* submit error */}
          {error && (
            <SubmitError
              message={error.message || "Something went wrong"}
              className="my-4"
            />
          )}

          {/* submit button */}
          <Button type="submit" className="w-full" disabled={isPending}>
            update Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
