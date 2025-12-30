"use server";

import { User } from "next-auth";
import { LoginFields } from "@/lib/types/auth";

export default async function LoginService(fields: LoginFields) {
  const respone = await fetch(`${process.env.API_URL}/auth/signin`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload: APIResponse<User> = await respone.json();
  return payload;
}
