"use server";

import { 
    OtpField,
    OtpRespone 
 } from "@/lib/types/auth";

export default async function VerifyOtpService(field:OtpField){
    const respone = await fetch(`${process.env.API_URL}/auth/verifyResetCode`, {
        method: 'POST',
        body: JSON.stringify({
            'resetCode':field.otpcode
        }) ,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const payload:APIResponse<OtpRespone>=await respone.json();
    return payload;
}