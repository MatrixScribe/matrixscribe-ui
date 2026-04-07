import { NextResponse } from "next/server";
import { timeline } from "@/lib/data/timeline";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  return NextResponse.json(timeline[slug] || []);
}
