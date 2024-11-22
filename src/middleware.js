import { NextResponse } from "next/server";
import { validateToken } from "./app/api/auth/actions";

const protectedRoutes = ["/upload", "/quiz/list"];

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const isValid = await validateToken(token);

  if (!isValid && protectedRoutes.includes(request.nextUrl.pathname)) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.set("redirect", request.nextUrl.pathname);
    return response;
  }
}
