import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Diploma from "@/lib/types/diploma";

export async function GET(req:NextRequest){ 
    // get params
    const searchParams = req.nextUrl.searchParams;
    const pageParam = searchParams.get('page')||1;
    const limit = searchParams.get('limit')||6;

    // get token 
    const token =await getToken({req ,secret:process.env.NEXTAUTH_SECRET!});
    if(!token){
        return NextResponse.json({messge:'Unauthorized',code:401},{
            status:401
        })
    }

    // get diplomas
    const response = await fetch(`${process.env.API_URL}/subjects?limit=${limit}&page=${pageParam}`,
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
        return NextResponse.json({message:'Failed to get diplomas',code:500},{
            status:500
        })
    }

    const payload:APIResponse<PaginationResponse<Diploma[]>> = await response.json();
    return NextResponse.json(payload);
}
