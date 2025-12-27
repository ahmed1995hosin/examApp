import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getToken() {

 const nameCookie  = process.env.NODE_ENV === 'production' 
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

    const tokenCookie  = cookies().get(nameCookie);
    const tokenJwt = tokenCookie?.value;
    
    try {
        const decodedToken = await decode({
            token: tokenJwt!,
            secret: process.env.NEXTAUTH_SECRET!,
        });
        return decodedToken;
    } catch (error) {
        void error;
        return null;
    }
}
