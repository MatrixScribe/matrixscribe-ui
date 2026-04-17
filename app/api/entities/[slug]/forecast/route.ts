import { NextResponse } from "next/server";
import { forecast } from "@/lib/data/forecast";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  return NextResponse.json(forecast[slug] || []);
}
