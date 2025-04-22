import GoogleProvider from "next-auth/providers/google";

import connectDB from "@/config/database";
import User from "@/models/User";
import NextAuth, { NextAuthConfig } from "next-auth";

export const authOptions = {
  // pages: {
  //   signIn: "/",
  // },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const homePage = request.nextUrl.pathname === "/";
      if (auth) return !!auth?.user;
    },

    async signIn({ profile }: { profile: any }) {
      await connectDB();
      const userExists = await User?.findOne({ email: profile.email });
      if (!userExists) {
        const username = profile.name.slice(0, 20);
        await User?.create({
          username,
          email: profile.email,
          image: profile.picture,
        });
      }
      return true;
    },
    async session({ session }: { session: any }) {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      return session;
    },
  },
} as NextAuthConfig;

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authOptions);
