"use server";

import { ResetPasswordFields, ResetPasswordRespone } from "@/lib/types/auth";

export default async function ResetPasswordService(field: ResetPasswordFields) {
  const respone = await fetch(`${process.env.API_URL}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(field),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload: APIResponse<ResetPasswordRespone> = await respone.json();
  return payload;
}
