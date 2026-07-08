import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend"; // Using Resend for Magic Links (can be swapped)
// import { DrizzleAdapter } from "@auth/drizzle-adapter"; // For connecting to D1 SQLite
// import { db } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: DrizzleAdapter(db), // Uncomment when D1 is fully linked
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Resend({
      from: "no-reply@vouchsync.pages.dev",
      // apiKey: process.env.RESEND_API_KEY, 
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      // Pass the user ID to the session for D1 database queries
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  session: {
    strategy: "database", // MNC Standard for securely managing sessions
  },
});
