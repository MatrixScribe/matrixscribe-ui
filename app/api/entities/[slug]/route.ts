import { NextResponse } from "next/server";
import { entities } from "@/lib/data/entities";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const entity = entities.find((e) => e.slug === slug);

  if (!entity) {
    return NextResponse.json({ error: "Entity not found" }, { status: 404 });
  }

  return NextResponse.json(entity);
}
