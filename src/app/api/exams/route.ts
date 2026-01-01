import Exam from "@/lib/types/exam";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // get params
  const searchParams = req.nextUrl.searchParams;
  const subjectId = searchParams.get("subjectId");
  // const page = searchParams.get("page") || 1;
  // const limit = searchParams.get("limit") || 6;

  if (!subjectId) {
    return NextResponse.json(
      { message: "not found", code: 404 },
      {
        status: 404,
      }
    );
  }

  // get token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized", code: 401 },
      {
        status: 401,
      }
    );
  }

  // get Questions
  // const response = await fetch(`${process.env.API_URL}/exams?subject=${subjectId}&page=${page}&limit=${limit}`
  const response = await fetch(`${process.env.API_URL}/exams`, {
    method: "GET",
    headers: {
      token: token.token,
      "Content-Type": "application/json",
    },
  });

  // handle error
  if (!response.ok) {
    return NextResponse.json(
      { message: "Failed to get exams", code: 500 },
      {
        status: 500,
      }
    );
  }

  // return response
  const responsePayload: APIResponse<PaginationResponse<Exam[]>> =
    await response.json();
  return NextResponse.json(responsePayload);
}
