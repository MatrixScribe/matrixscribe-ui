import { NextResponse } from "next/server";
import { forecast } from "@/lib/data/forecast";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  return NextResponse.json(forecast[slug] || []);
}
