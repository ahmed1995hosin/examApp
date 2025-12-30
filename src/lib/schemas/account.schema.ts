import { z } from "zod";

// accountSchema
export const accountSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be at least 3 characters")
    .nonempty("Your username is required"),
  firstName: z.string().nonempty("Your first name is required"),
  lastName: z.string().nonempty("Your last name is required"),
  email: z.email("Invalid email address").nonempty("Your email is required"),
  phone: z
    .string()
    .nonempty("Your phone number is required")
    .transform((val) => val.replace(/[^0-9]/g, ""))
    .transform((val) => (val.startsWith("20") ? "0" + val.slice(2) : val))
    .refine((val) => /^01[0125][0-9]{8}$/.test(val), {
      message: "Invalid phone number format",
    }),
});

export type AccountFields = z.infer<typeof accountSchema>;

// change password
export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(6, "Password should be at least 8 characters")
    .nonempty("Your password is required"),
  password: z
    .string()
    .nonempty("Your password is required")
    .min(8, "Password should be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  rePassword: z.string().nonempty("Your password is required"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
});

export type ChangePasswordFields = z.infer<typeof changePasswordSchema>;