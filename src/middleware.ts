import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    // token
    const token =await getToken({req ,secret:process.env.NEXTAUTH_SECRET!});

    // public routes
    const authRoutes:string[] = [ '/login', '/register', '/forget-password' ];
    
    // for private routes
    if(!authRoutes.includes(req.nextUrl.pathname)){
        if(token) return NextResponse.next();

        // go to login page with callbackUrl 
        const url = new URL('/login', req.nextUrl.origin);
        url.searchParams.set('callbackUrl', req.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    // if auth
    if(token){
        return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }

    // public routes
    return NextResponse.next();
}

export const config ={
  
    matcher : [ 
         /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
};
