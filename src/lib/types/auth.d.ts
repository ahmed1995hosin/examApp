import z from "zod";
import { 
    forgetPasswordEmailSchema, 
    loginSchema, 
    registerSchema,
    otpSchema } from "../schemas/auth.schema";
import { User } from "next-auth";

// login fields
export type LoginFields = z.infer<typeof loginSchema>;

// login response
export type LoginRespone ={
    token:string,
    user:User['user']
};

// register fields
export type RegisterFields = z.infer<typeof registerSchema>;

// register response
export type RegisterRespone = Omit<User['user']>;

// forget password fields
export type ForgetPasswordField = z.infer<typeof forgetPasswordEmailSchema> ; // email

// forget password response
export type ForgetPasswordRespone = {
    info?:string
}

// otp fields
export type OtpField = z.infer<typeof otpSchema>;

// otp response
export type OtpRespone = {};
// reset password fields
export type ResetPasswordFields = z.infer<typeof resetPasswordSchema>;

// reset password response
export type ResetPasswordRespone = {};