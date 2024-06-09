import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const parsedCredIden = JSON.parse(credentials.identifier);
          const user = await UserModel.findOne({
            email: parsedCredIden?.email,
          });
          if (!user) {
            throw new Error("No user found with this email");
          }
          const isPassCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPassCorrect) {
            throw new Error("Invalid Password");
          } else {
            return user;
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  //   pages: {
  //     signIn: "/sign-in"
  //   },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id?.toString();
        token.email = user.email?.toString();
      }
      return token;
    },
    async session({ session, token }) {
      // session.user.token = token;
      // return { session, token };
      return session;
    },
  },
};
