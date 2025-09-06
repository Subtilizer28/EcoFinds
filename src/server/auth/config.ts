import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { db } from "~/server/db";

// ------------------
// Type Augmentation
// ------------------
declare module "next-auth" {
  interface User {
    id?: string | undefined;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    description?: string | null;
    phone?: string | null;
    role?: string | null;
  }

  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }
}

// ------------------
// NextAuth Config
// ------------------
export const authConfig = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt", // required for CredentialsProvider
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            description: true,
            phone: true,
            image: true,
            role: true,
          },
        }) as {
          id: string;
          name: string | null;
          email: string | null;
          password: string | null;
          description?: string | null;
          phone?: string | null;
          image?: string | null;
          role?: string | null;
        } | null;

        if (!user?.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          description: user.description ?? undefined,
          phone: user.phone ?? undefined,
          role: user.role ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When user logs in, persist extra fields into the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.description = user.description;
        token.phone = user.phone;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Push fields from token into session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email!;
        session.user.name = token.name!;
        session.user.image = token.image as string;
        session.user.description = token.description as string | undefined;
        session.user.phone = token.phone as string | undefined;
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
