import { NextResponse } from "next/server";
import { publishers } from "@/lib/data/publishers";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  return NextResponse.json(publishers[slug] || []);
}
