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

          if (!user || user.password !== password) {
            (await dbConnect()).closeConnection();
            throw new Error("No user found");
          }
          // console.log({ id: user.id, user: user.username });
          return { id: user.id, name: user.username };
        } catch (error) {
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("from jwt", { token, user });
      return token;
    },
    async session({ session, token }) {
      session.user.id = token?.id;

      // console.log({ session });
      return Promise.resolve(session);
    },
  },
};
export default NextAuth(authOptions);
