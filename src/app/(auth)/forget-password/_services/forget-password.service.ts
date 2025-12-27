"use server";

import { 
    ForgetPasswordField, 
    ForgetPasswordRespone 
} from "@/lib/types/auth";

export default async function ForgetPasswordService(field:ForgetPasswordField){
    console.log("filed",field);
    const respone = await fetch(`${process.env.API_URL}/auth/forgotPassword`, {
        method: 'POST',
        body: JSON.stringify(field) ,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(respone);
    const payload:APIResponse<ForgetPasswordRespone>=await respone.json();
    return payload;
}