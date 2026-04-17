import { NextResponse } from "next/server";
import { alerts } from "@/lib/data/alerts";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  return NextResponse.json(alerts[slug] || []);
}
