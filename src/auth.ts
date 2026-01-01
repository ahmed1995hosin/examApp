import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import LoginService from "./app/(auth)/login/_services/login.service";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const payload = await LoginService({
          email: credentials?.email,
          password: credentials?.password,
        });
        if ("code" in payload) {
          throw new Error(payload.message);
        }
        return {
          id: payload.user._id,
          token: payload.token,
          user: payload.user,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        {
          token.token = user.token;
          token.user = user.user;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
