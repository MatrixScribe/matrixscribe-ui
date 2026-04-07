import { NextResponse } from "next/server";
import { related } from "@/lib/data/related";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  return NextResponse.json(related[slug] || []);
}
