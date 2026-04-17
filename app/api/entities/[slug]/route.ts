import { NextResponse } from "next/server";
import { entities } from "@/lib/data/entities";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const entity = entities.find((e) => e.slug === slug);

  if (!entity) {
    return NextResponse.json({ error: "Entity not found" }, { status: 404 });
  }

  return NextResponse.json(entity);
}
