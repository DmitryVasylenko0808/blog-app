import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./app/_lib/session";

export async function middleware(req: NextRequest) {
  const session = await verifySession();

  if (!session?.userId) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/articles/create", "/articles/:id/edit"],
};
