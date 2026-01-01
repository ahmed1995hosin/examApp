"use server";

import { getToken } from "@/lib/utils/mange-token";
import { ChangePasswordResponse } from "@/lib/types/account.d";
import { ChangePasswordFields } from "@/lib/schemas/account.schema";

export default async function ChangePasswordService(
  fields: ChangePasswordFields
) {
  // get token
  const token = await getToken();
  if (!token) {
    return { message: "Unauthorized", code: 401 };
  }

  // change password
  const response = await fetch(`${process.env.API_URL}/auth/changePassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: token?.token,
    },
    body: JSON.stringify(fields),
  });
  const payload: APIResponse<ChangePasswordResponse> = await response.json();
  console.log(payload);
  return payload;
}
