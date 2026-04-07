import { NextResponse } from "next/server";
import { alerts } from "@/lib/data/alerts";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  return NextResponse.json(alerts[slug] || []);
}
