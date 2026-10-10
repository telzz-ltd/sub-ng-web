import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
  const c = await cookies();
  //   const accessToken = c.get("accessToken");
  const user = c.get("user");

  const guestRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  if (user && guestRoutes.includes(req.nextUrl.pathname)) {
    req.nextUrl.pathname = "/app";
    return NextResponse.redirect(req.nextUrl);
  }

  if (!user && req.nextUrl.pathname.startsWith("/app")) {
    req.nextUrl.pathname = "/login";
    req.nextUrl.searchParams.set("redirect_url", req.nextUrl.pathname);
    return NextResponse.redirect(req.nextUrl);
  }
}
