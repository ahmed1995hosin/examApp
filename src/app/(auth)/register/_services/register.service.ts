"use server";

import { RegisterFields, RegisterRespone } from "@/lib/types/auth";

export default async function RegisterService(fields: RegisterFields) {
  const response = await fetch(`${process.env.API_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const payload: APIResponse<RegisterRespone> = await response.json();
  return payload;
}
