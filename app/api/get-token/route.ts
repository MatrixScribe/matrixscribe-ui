import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const backendToken = cookieStore.get("token")?.value || null;

  // If backend cookie isn't visible to Next.js, return null
  if (!backendToken) {
    return NextResponse.json({ token: null });
  }

  // Store token on UI domain
  const res = NextResponse.json({ token: backendToken });

  res.cookies.set({
    name: "token",
    value: backendToken,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
