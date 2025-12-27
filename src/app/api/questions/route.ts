import { Question } from "@/lib/types/question";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    // get params
    const searchParams = req.nextUrl.searchParams;
    const examId = searchParams.get('examId');

    if(!examId){
        return NextResponse.json({message:'not found',code:404},{
            status:404
        })
    } 

    // get token
    const token =await getToken({req,secret:process.env.NEXTAUTH_SECRET!});
    if(!token){
        return NextResponse.json({message:'Unauthorized',code:401},{
            status:401
        })
    }

    // get Questions
    const response = await fetch(`${process.env.API_URL}/questions?exam=${examId}`,
        {   
            method: 'GET',
            headers: {
                'token': token.token,
                'Content-Type': 'application/json'
            }
        }
    );

    // handle error
    if(!response.ok){
        return NextResponse.json({message:'Failed to get questions',code:500},{
            status:500
        })
    }
   
    // return response
    const responsePayload:APIResponse<PaginationResponse<Question[]>>= await response.json();
    return NextResponse.json(responsePayload);
}
