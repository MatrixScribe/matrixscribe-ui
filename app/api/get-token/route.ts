import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies(); // <-- FIXED
  const token = cookieStore.get("token")?.value || null;

  return NextResponse.json({ token });
}
