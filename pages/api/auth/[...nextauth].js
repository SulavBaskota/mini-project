import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const res = await fetch("/api/login", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();
        // if (res.ok && user) {
        //   return user;
        // }
        // return null;

        const user = {
          id: 2,
          name: "sulav",
          role: "reader",
        };

        if (
          credentials.username === "sulav" &&
          credentials.password === "test"
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userRole = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.userRole = token.userRole;
      }
      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
});
