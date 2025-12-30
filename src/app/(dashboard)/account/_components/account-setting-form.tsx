import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { accountSchema } from "@/lib/schemas/account.schema";
import { AccountFields } from "@/lib/schemas/account.schema";
import { Session } from "next-auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import AccountDeleteModal from "./account-delete-modal";
import useUpdateProfile from "../_hook/use-update-account";
import { toast } from "sonner";
import SubmitError from "@/components/shared/submit-error";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

export default function AccountSettingForm({ user }: { user: Session | null }) {
  //   const { data:user,update } = useSession();
  // format phone
  const formatPhone = (value: string) => {
    let digits = value.replace(/[^0-9]/g, "");

    if (digits.startsWith("20")) {
      digits = "0" + digits.slice(2);
    }

    return digits;
  };

  // format phone display
  const formatPhoneDisplay = (value: string) => {
    if (value.startsWith("0")) {
      return "+20" + value.slice(1);
    }
    return value;
  };

  // form
  const form = useForm<AccountFields>({
    defaultValues: {
      firstName: user?.user?.firstName || "",
      lastName: user?.user?.lastName || "",
      username: user?.user?.username || "",
      email: user?.user?.email || "",
      phone: formatPhoneDisplay(user?.user?.phone || ""),
    },
    reValidateMode: "onChange",
    resolver: zodResolver(accountSchema),
  });

  //   use useUpdateProfile
  const { isPending, error, updateAccount } = useUpdateProfile();

  // submit handler
  const onSubmit: SubmitHandler<AccountFields> = (fields) => {
    updateAccount(fields, {
      onSuccess: async (data) => {
        toast.success("Account Profile updated successfully");
        // await update({
        //     ...data.user,
        // });
        // console.log(data);
        router.refresh();
      },
    });
  };

  //  state delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="p-6">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* name */}
            <div className="flex gap-2.5 ">
              {/* first name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        error={Boolean(form.formState.errors.firstName)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* last name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        error={Boolean(form.formState.errors.lastName)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      error={Boolean(form.formState.errors.username)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      error={Boolean(form.formState.errors.email)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      onChange={(value) => field.onChange(formatPhone(value))}
                      error={Boolean(form.formState.errors.phone)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* error general */}
            {error && (
              <SubmitError
                className="my-4"
                message={error.message || "Something went wrong"}
              />
            )}
            {/* delete account and update account button */}
            <div className="flex gap-3.5 pt-4">
              {/* delete account */}
              <Button
                type="button"
                className="flex-1 text-red-600 bg-red-50 transition-all hover:bg-red-100"
                onClick={() => setOpenDeleteModal(true)}
                disabled={isPending}
              >
                Delete My Account
              </Button>

              {/* update account */}
              <Button type="submit" className="flex-1" disabled={isPending}>
                {isPending ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* modal delete account */}
      {openDeleteModal && (
        <AccountDeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </>
  );
}
