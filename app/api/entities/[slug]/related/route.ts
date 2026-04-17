import { NextResponse } from "next/server";
import { related } from "@/lib/data/related";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  return NextResponse.json(related[slug] || []);
}
