import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await dbConnect();

        const { username, password } = credentials;
        const user = await await User.findOne(
          { username },
          "username password userrole"
        );

        if (!user) return null;
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;
        const responseData = {
          id: user._id,
          username: user.username,
          userrole: user.userrole,
        };
        return responseData;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        const res = await User.findById(session.user.id, "imgUrl");
        session.user.imgUrl = res.imgUrl;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    // maxAge: 3 * 60 * 60,
  },
  jwt: {
    encryption: true,
  },
  pages: {
    signIn: "/auth/signIn",
  },
});
