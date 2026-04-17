import { NextResponse } from "next/server";
import { timeline } from "@/lib/data/timeline";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  return NextResponse.json(timeline[slug] || []);
}
