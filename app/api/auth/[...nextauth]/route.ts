import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const client = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        name: {
          label: "Name of the Organisation",
          type: "text",
          placeholder: "Enter the name of the organisation",
        },
        email: {
          label: "Email ID",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials: any) {
        const orgEmail = credentials.email;
        const orgPass = credentials.password;
        const org: any = await client.organisations.findUnique({
          where: {
            email: orgEmail,
            password: orgPass,
          },
        });
        return {
          id: org.id,
          email: org.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/orgSignin",
  },
});

export { handler as GET, handler as POST };
