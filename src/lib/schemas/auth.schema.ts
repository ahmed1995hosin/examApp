import z from "zod";

// role User
const roleUser = {
    'USER': 'user',
   'ADMIN': 'admin',
    'EDITOR': 'editor'
} as const

const roleSchema = z.object({
    role:z.enum(roleUser)
})

export type RoleUser=z.infer<typeof roleSchema>

// loginSchema 
export const loginSchema = z.object({
    email: z.email('Invalid email address').nonempty('Your email is required'),
    password: z.string().nonempty('Your password is required'),
})

// registerSchema
export const registerSchema = z.object({
    username: z.string().min(3,'Username should be at least 3 characters').nonempty('Your username is required'),
    firstName: z.string().nonempty('Your first name is required'),
    lastName: z.string().nonempty('Your last name is required'),
    email: z.email('Invalid email address').nonempty('Your email is required'),
    password: z.string().nonempty('Your password is required').min(8,'Password should be at least 8 characters')
                        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                        .regex(/[0-9]/, "Password must contain at least one number")
                        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    rePassword: z.string().nonempty('Your password is required'),
   phone: z.string()
    .nonempty("Your phone number is required")
    .transform((val) => val.replace(/[^0-9]/g, ""))
    .transform((val) => val.startsWith("20") ? "0" + val.slice(2) : val)
    .refine((val) => /^01[0125][0-9]{8}$/.test(val), {
        message: "Invalid phone number format",
    }),
}).refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
});

// forgetPasswordSchema email
export const forgetPasswordEmailSchema = z.object({
    email: z.email('Invalid email address').nonempty('Your email is required'),
})

// otpSchema
export const otpSchema = z.object({
    otpcode: z.string().nonempty('OTP is required').min(6,'OTP should be at least 6 characters'),
})

// resetPasswordSchema
export const resetPasswordSchema = z.object({
    newPassword: z.string().nonempty('Your password is required').min(8,'Password should be at least 8 characters')
                        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                        .regex(/[0-9]/, "Password must contain at least one number")
                        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().nonempty('Your password is required'),
    email: z.email('Invalid email address').optional(),
}).refine((data) => data.newPassword=== data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
