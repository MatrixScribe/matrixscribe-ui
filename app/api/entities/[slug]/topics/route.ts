import { NextResponse } from "next/server";
import { topics } from "@/lib/data/topics";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  return NextResponse.json(topics[slug] || []);
}
