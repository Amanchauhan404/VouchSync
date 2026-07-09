import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { drizzle } from "drizzle-orm/d1";

// Drizzle Adapter requires the DB instance, which in Cloudflare Pages is injected into process.env at runtime
export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  // We initialize the DB connection inside the NextAuth config factory
  // so that process.env.DB is available at request time on the Edge.
  const db = drizzle(process.env.DB as any);

  return {
    adapter: DrizzleAdapter(db),
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    pages: {
      signIn: "/login",
    },
    callbacks: {
      async session({ session, user }) {
        if (session.user && user) {
          session.user.id = user.id;
        }
        return session;
      },
    },
    session: {
      strategy: "database", 
    },
  };
});
