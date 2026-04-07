import { NextResponse } from "next/server";
import { topics } from "@/lib/data/topics";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  return NextResponse.json(topics[slug] || []);
}
