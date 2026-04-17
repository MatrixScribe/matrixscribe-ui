import { NextResponse } from "next/server";
import { publishers } from "@/lib/data/publishers";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  return NextResponse.json(publishers[slug] || []);
}
