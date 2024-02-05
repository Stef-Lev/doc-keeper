import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "./helpers/constants";

export async function middleware(request) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  if (
    PROTECTED_ROUTES.some(
      (path) => pathname === path || pathname.includes("/document")
    )
  ) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const url = new URL(`/login`, request.url);
      return NextResponse.redirect(url);
    }
  }
  return res;
}
