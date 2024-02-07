import NextAuth from "next-auth";
import User from "models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";

export const authOptions = {
  session: { jwt: true },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials;
        try {
          await dbConnect();
          const user = await User.findOne({
            username,
          }).select("+password");

          if (!user) {
            throw new Error("No user found");
          }

          const correctPassword = await user.correctPassword(
            password,
            user.password
          );
          if (!correctPassword) {
            throw new Error("Invalid password");
          }

          return { id: user.id, name: user.username };
        } catch (error) {
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      session.user.id = token?.id;
      return Promise.resolve(session);
    },
  },
};
export default NextAuth(authOptions);
