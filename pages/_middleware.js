import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const token = await getToken({ req, secret });
  if (
    token &&
    token.user.userrole !== "author" &&
    req.nextUrl.pathname.startsWith("/author")
  ) {
    return NextResponse.rewrite(new URL("/401", req.url));
  }
}
