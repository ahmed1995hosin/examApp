"use server";

import { AccountFields } from "@/lib/schemas/account.schema";
import { getToken } from "@/lib/utils/mange-token";
import { Session } from "next-auth";

export default async function UpdateAccountService(fields: AccountFields) {
  // get token
  const token = await getToken();
  if (!token) {
    return { message: "Unauthorized", code: 401 };
  }

  // update account
  const response = await fetch(`${process.env.API_URL}/auth/editProfile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token?.token,
    },
    body: JSON.stringify(fields),
  });
  const payload: APIResponse<Session> = await response.json();
  console.log("server", payload);
  return payload;
}
