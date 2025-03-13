import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/chat"];
const baseRoute = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookie = req.cookies.get("authToken")?.value;

  const isProtectedRoute = protectedRoutes.includes(path);
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  const isBaseRoute = baseRoute.includes(path);
  if (isBaseRoute) {
    const response = NextResponse.next();
    response.cookies.delete("authToken");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};