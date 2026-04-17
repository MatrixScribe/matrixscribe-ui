import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect("/login");

  res.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return res;
}
