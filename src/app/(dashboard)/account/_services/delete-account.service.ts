"use server";

import { getToken } from "@/lib/utils/mange-token";
import { DeleteAccountResponse } from "@/lib/types/account.d";

export default async function DeleteAccountService() {
  // token
  const token = await getToken();
  if (!token) {
    return { message: "Unauthorized", code: 401 };
  }

  // delete account
  const response = await fetch(`${process.env.API_URL}/auth/deleteMe`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token!.token,
    },
  });
  const payload: APIResponse<DeleteAccountResponse> = await response.json();
  return payload;
}
